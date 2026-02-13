import pool from '../database/database.js';
import { validate as isUUID } from 'uuid'

export const getAllStock = async (req,res) => {

    try{
        const result = await pool.query(
        `SELECT sp.id, sp.store_id, s.name AS store_name, sp.product_id, p.name AS name, p.sku, p.gtin,
        sp.current_stock, sp.daily_consumption, sp.min_stock, sp.created_at, sp.updated_at
        FROM store_products sp
        JOIN products p ON p.id = sp.product_id
        JOIN stores s ON s.id = sp.store_id
        ORDER BY p.name ASC, sp.updated_at DESC;`
        )

        const stockWithStatus = result.rows.map(item => {
            const startingStock = Number(item.current_stock);
            const dailyConsumption = Number(item.daily_consumption);
            const minStock = Number(item.min_stock);

            const dateSource = item.updated_at ?? item.created_at;
                        
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const updatedDate = new Date(dateSource);
            updatedDate.setHours(0, 0, 0, 0);

            const diffTime = today - updatedDate;
            const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));            

            let daysOfCoverage =
            dailyConsumption > 0
            ? startingStock / dailyConsumption
            : Infinity;

            daysOfCoverage = Math.max(0, Math.floor(daysOfCoverage - daysPassed));


            const formatteddateSource = new Date(dateSource).toLocaleDateString('pt-BR');

            const remainingStock = Math.max(
                0, startingStock - (item.daily_consumption * daysPassed)
            )


            let status;

            if(remainingStock <= minStock){
                status = 'Crítico'; 
            } else if (daysOfCoverage <= 3){
                status = 'Atenção';
            } else {
                status = 'Saudável';
            }

            return {
                id: item.id,
                store_name: item.store_name,
                product_sku: item.sku,
                product_gtin: item.gtin,
                product_id: item.product_id,
                name: item.name,
                starting_stock: item.current_stock,
                daily_consumption: item.daily_consumption,
                min_stock: item.min_stock,
                updatedDate: formatteddateSource,
                remainingStock: remainingStock,
                status: status,
                daysOfCoverage: daysOfCoverage
            }
        });        

        return res.json(stockWithStatus);

    } catch(err){
        console.log(err);
         return res.status(500).json({
            code: 'ERROR_SEARCHING_STOCK',
            message: 'Erro ao listar estoque dos produtos'
        })
    }
};

export const getStockByStore = async (req,res) => {

    const { storeInternalID } = req.params;

    if (!isUUID(storeInternalID)) {
            return res.status(400).json({
                code: 'INVALID_ID',
                message: 'ID da Loja inválido.'
            })
        };

    try{
        const result = await pool.query(
        `SELECT sp.id, sp.store_id, s.name AS store_name, sp.product_id, p.name AS name, p.sku, p.gtin,
        sp.current_stock, sp.daily_consumption, sp.min_stock, sp.created_at, sp.updated_at
        FROM store_products sp
        JOIN products p ON p.id = sp.product_id
        JOIN stores s ON s.id = sp.store_id WHERE sp.store_id = $1
        ORDER BY p.name ASC, sp.updated_at DESC;`,
        [storeInternalID]
        )

       const stockWithStatus = result.rows.map(item => {
            const startingStock = Number(item.current_stock);
            const dailyConsumption = Number(item.daily_consumption);
            const minStock = Number(item.min_stock);

            const dateSource = item.updated_at ?? item.created_at;
                        
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const updatedDate = new Date(dateSource);
            updatedDate.setHours(0, 0, 0, 0);

            const diffTime = today - updatedDate;
            const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));            

            let daysOfCoverage =
            dailyConsumption > 0
            ? startingStock / dailyConsumption
            : Infinity;

            daysOfCoverage = Math.max(0, Math.floor(daysOfCoverage - daysPassed));


            const formatteddateSource = new Date(dateSource).toLocaleDateString('pt-BR');

            const remainingStock = Math.max(
                0, startingStock - (item.daily_consumption * daysPassed)
            )


            let status;

            if(startingStock <= minStock){
                status = 'Crítico'; 
            } else if (daysOfCoverage <= 3){
                status = 'Atenção';
            } else {
                status = 'Saudável';
            }

            return {
                id: item.id,
                store_name: item.store_name,
                product_sku: item.sku,
                product_gtin: item.gtin,
                product_id: item.product_id,
                name: item.name,
                starting_stock: item.current_stock,
                daily_consumption: item.daily_consumption,
                min_stock: item.min_stock,
                updatedDate: formatteddateSource,
                remainingStock: remainingStock,
                status: status,
                daysOfCoverage: daysOfCoverage
            }
        });        

        return res.json(stockWithStatus);

    } catch(err){
        console.log(err);
         return res.status(500).json({
            code: 'ERROR_SEARCHING_STOCK',
            message: 'Erro ao listar estoque dos produtos'
        })
    }
};

export const updateStock = async (req, res) => {

    try {
        
        const { stockID } = req.params;

        const { starting_stock, daily_consumption, min_stock } = req.body;       

        const currentStockNum = Number(starting_stock);
        const dailyConsumptionNum = Number(daily_consumption);
        const minStockNum = Number(min_stock);
        const today = new Date();

        if (!isUUID(stockID)) {
        return res.status(400).json({
            code: 'INVALID_ID',
            message: 'ID inválido'
        })
        }

        if(currentStockNum <= dailyConsumptionNum){
            return res.status(422).json({
                code: 'INVALID_VALUES',
                message: 'O estoque precisa ser maior que o consumo diário.'
            });
        }

        if (
            isNaN(currentStockNum) ||
            isNaN(dailyConsumptionNum) ||
            isNaN(minStockNum) ||
            currentStockNum <= 0 ||
            dailyConsumptionNum <= 0 ||
            minStockNum <= 0             
        ) {
            return res.status(422).json({
                code: 'INVALID_VALUES',
                message: 'Um ou mais dados inválidos.'
            });
        }

        const result = await pool.query(
            `SELECT * FROM store_products WHERE id = $1`,
            [stockID]
        )

        if(result.rowCount === 0 ){
            return res.status(404).json({
                code: 'STOCK_NOT_FOUND',
                message: 'Estoque não encontrado.'
            });            
        };

        await pool.query(
            `UPDATE store_products SET current_stock = $1, daily_consumption = $2, min_stock = $3,
            updated_at = $4 WHERE id = $5`,
            [   
                currentStockNum,
                dailyConsumptionNum,
                minStockNum,
                today,
                stockID                
            ]
            );

        return res.status(201).json({
            code: 'CREATE_PRODUCT_SUCCESS',
            message: 'Estoque alerado com sucesso.'
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            code: 'ERROR_REGISTERING_PRODUCT',
            message: 'Erro ao atualizar estoque.'
        });
    } 
};

export const deleteStock = async (req, res) => {

    try{

    const { stockID } = req.params;

    if (!isUUID(stockID)) {
            return res.status(400).json({
                code: 'INVALID_ID',
                message: 'ID do estoque inválido.'
            })
        };

    const result = await pool.query(
            "DELETE FROM store_products WHERE id = $1",
            [stockID]
        )

    if(result.rowCount === 0){
            return res.status(404).json({
                code: 'STOCK_NOT_FOUND',
                message: 'Estoque não encontrado.'
            })
        }

    return res.sendStatus(204);
    
    } catch (err){
        return res.status(500).json({
            code: 'ERROR_DELETING_STOCK',
            message: 'Erro ao excluir estoque.'
        })
    }

};