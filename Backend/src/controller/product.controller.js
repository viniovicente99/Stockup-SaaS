import pool from '../database/database.js';
import { validate as isUUID } from 'uuid'

export const registerProduct = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { name, gtin, sku, stores } = req.body;

        if (!name || !gtin || !sku || !Array.isArray(stores)) {
            return res.status(400).json({
                code: 'EMPTY_FIELDS',
                message: 'Campos obrigatórios inválidos'
            });
        }

        const validStores = stores.filter(
            (s) =>
                s.starting_stock !== undefined &&
                s.daily_consumption !== undefined &&
                s.min_stock !== undefined
        );

        if (validStores.length === 0) {
            return res.status(422).json({
                code: 'INVALID_VALUES',
                message: 'Pelo menos uma loja deve ser preenchida.'
            });
        }

        const productExists = await client.query(
            'SELECT 1 FROM products WHERE gtin = $1 OR sku = $2',
            [gtin, sku]
        );

        if (productExists.rowCount > 0) {
            return res.status(400).json({
                code: 'PRODUCT_ALREADY_EXISTS',
                message: 'Produto já cadastrado'
            });
        }

        const insertProduct = await client.query(
            `
            INSERT INTO products (name, gtin, sku)
            VALUES ($1, $2, $3)
            RETURNING id
            `,
            [name, gtin, sku]
        );

        const productID = insertProduct.rows[0].id;

        for (const store of validStores) {
            const currentStockNum = Number(store.starting_stock);
            const dailyConsumptionNum = Number(store.daily_consumption);
            const minStockNum = Number(store.min_stock);

            if (
                !store.store_id ||
                isNaN(currentStockNum) ||
                isNaN(dailyConsumptionNum) ||
                isNaN(minStockNum) ||
                currentStockNum <= 0 ||
                dailyConsumptionNum <= 0 ||
                minStockNum <= 0
            ) {
                return res.status(422).json({
                    code: 'INVALID_VALUES',
                    message: 'Dados inválidos para uma ou mais lojas.'
                });
            }

            if (currentStockNum <= dailyConsumptionNum) {
                return res.status(422).json({
                    code: 'INVALID_STOCK',
                    message: 'O estoque precisa ser maior que o consumo diário.'
                });
            }

            await client.query(
                `
                INSERT INTO store_products
                (product_id, store_id, current_stock, daily_consumption, min_stock)
                VALUES ($1, $2, $3, $4, $5)
                `,
                [
                    productID,
                    store.store_id,
                    currentStockNum,
                    dailyConsumptionNum,
                    minStockNum
                ]
            );
        }

        await client.query('COMMIT');

        return res.status(201).json({
            code: 'CREATE_PRODUCT_SUCCESS',
            message: 'Produto criado com sucesso.'
        });

    } catch (err) {
        await client.query('ROLLBACK');

        if (err.code === '23505') {
            return res.status(409).json({
                code: 'PRODUCT_ALREADY_ADDED',
                message: 'Estoque já adicionado à loja.'
            });
        }

        if (err.code === '23503') {
            return res.status(409).json({
                code: 'ITEM_NOT_FOUND',
                message: 'Loja não encontrada.'
            });
        }

        console.error(err);

        return res.status(500).json({
            code: 'ERROR_REGISTERING_PRODUCT',
            message: 'Erro ao cadastrar produto.'
        });
    } finally {
        client.release();
    }
};

export const getAllProducts = async (req,res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products ORDER BY name ASC"
        )
        res.json(result.rows);
    } catch (err){
         return res.status(500).json({
            code: 'ERROR_LISTING_PRODUCTS',
            message: 'Erro ao buscar produtos.'
        })
    }    
};

export const editProduct = async (req, res) => {
    try{
        const {productID} = req.params;

        const {name} = req.body;

        if (!isUUID(productID)) {
        return res.status(400).json({
            code: 'INVALID_ID',
            message: 'ID inválido'
        })
        }

        if(!name){
            return res.status(400).json({
                code: 'EMPTY_FIELDS',
                message: 'Todos os campos são obrigatórios.'
            })
        };

        const result = await pool.query(
            "UPDATE products SET name = $1 WHERE id = $2",
            [name, productID]
        )

        if(result.rowCount === 0){
            return res.status(404).json({
                code: 'PRODUCT_NOT_FOUND',
                message: 'Produto não encontrado ou você não tem permissão para editar.'
            })
        }
        return res.status(201).json({
            code: 'PRODUCT_EDIT_SUCCESS',
            message: 'Produto editado com sucesso.'
        })
    } catch (err){
        return res.status(500).json({
            code: 'ERROR_EDITING_PRODUCT',
            message: 'Erro ao editar produto.'
        })
    }
};

export const deleteProduct = async(req, res) => {

    try {
        const {productID} = req.params; 

        if (!isUUID(productID)) {
        return res.status(400).json({
            code: 'INVALID_ID',
            message: 'ID inválido'
        })
        }

        const result = await pool.query(
            "DELETE FROM products WHERE id = $1",
            [productID]
        )

        if(result.rowCount === 0){
            return res.status(404).json({
                code: 'PRODUCT_NOT_FOUND',
                message: 'Produto não encontrado.'
            })
        }

        return res.status(204).json({
            code: 'PRODUCT_DELETE_SUCCESS)',
            message: 'Produto excluido com sucesso.'
        })

    } catch (err){

        if(err.code === '23503'){
            return res.status(500).json({
            code: 'ERROR_PRODUCT_HAS_STOCK',
            message: 'Não é possível excluir produtos com estoques associados.'
        })
        };

        return res.status(500).json({
            code: 'ERROR_DELETING_PRODUCT',
            message: 'Erro ao excluir produto.'
        })
    }

}; 

