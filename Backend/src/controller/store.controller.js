import pool from '../database/database.js';
import { validate as isUUID } from 'uuid'

export const getStores = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM stores ORDER BY store_id ASC"
        )
        return res.json(result.rows);

    } catch(err){
        return res.status(500).json({
            code: 'ERROR_SEARCHING_STORE',
            message: 'Erro ao listar lojas'
        })

    }
};

export const getStoresByID = async (req, res) => {
    
    const { storeInternalID } = req.params;

     if (!isUUID(storeInternalID)) {
            return res.status(400).json({
                code: 'INVALID_ID',
                message: 'ID da Loja inválido.'
            })
        };

    try {
        const result = await pool.query(
            "SELECT * FROM stores WHERE ID = $1 ORDER BY store_id ASC",
            [storeInternalID]
        )

        return res.json(result.rows);

    } catch(err){
        return res.status(500).json({
            code: 'ERROR_SEARCHING_STORE',
            message: 'Erro ao listar loja'
        })

    }
};

export const createStore = async (req, res) => {
    try{
        const { store_id, name } = req.body;

        if(!store_id || !name ){
            return res.status(400).json({
                code: 'EMPTY_FIELDS',
                message: 'Todos os campos são obrigatórios'
            })
        };

        const { rows } = await pool.query(
            "SELECT * FROM stores WHERE store_id = $1",
            [store_id]
        );

        if(rows.length > 0){
            return res.status(400).json({
                code: 'STORE_CODE_ALREADY_EXISTS',
                message: 'Código da loja já cadastrado.'
            })
        };

        await pool.query(
            "INSERT INTO stores (store_id, name) VALUES ($1, $2)",
            [store_id, name]
        )

        return res.status(201).json({
            code: 'STORE_REGISTER_SUCCESS',
            message: 'Loja registrada com sucesso'
        })
    } catch (err){
        return res.status(500).json({
            code: 'ERROR_REGISTERING_STORE',
            message: 'Erro ao registrar loja'
        })
    }
};

export const editStore = async (req, res) => {
    try{
        const {storeInternalID} = req.params;

        const {name} = req.body;

        if (!isUUID(storeInternalID)) {
            return res.status(400).json({
                code: 'EMPTY_ID',
                message: 'O ID é obrigatório'
            })
        };

        if(!name){
            return res.status(400).json({
                code: 'EMPTY_FIELDS',
                message: 'Todos os campos são obrigatórios'
            })
        };

        const result = await pool.query(
            "UPDATE stores SET name = $1 WHERE id = $2",
            [name, storeInternalID]
        )

        if(result.rowCount === 0){
            return res.status(404).json({
                code: 'STORE_NOT_FOUND',
                message: 'Loja não encontrada ou você não tem permissão para editar.'
            })
        }
        return res.status(201).json({
            code: 'STORE_EDIT_SUCCESS',
            message: 'Loja editada com sucesso.'
        })
    } catch (err){
        return res.status(500).json({
            code: 'ERROR_EDITING_STORE',
            message: 'Erro ao editar loja.'
        })
    }
};

export const deleteStore = async (req, res) => {
    try {
        const { storeInternalID } = req.params;

        if (!isUUID(storeInternalID)) {
            return res.status(400).json({
                code: 'EMPTY_ID',
                message: 'O ID é obrigatório'
            })
        };

        const result = await pool.query(
            "DELETE FROM stores WHERE id = $1",
            [storeInternalID]
        );

        if(result.rowCount === 0){
            return res.status(404).json({
                code: 'STORE_NOT_FOUND',
                message: 'Loja não encontrada.'
            })
        }

        return res.sendStatus(204);
        
    } catch (err){
        console.log(err);

        if(err.code === '23503'){
            return res.status(500).json({
            code: 'ERROR_STORE_HAS_STOCK',
            message: 'Não é possível excluir lojas com estoques associados.'
        })
        };

        return res.status(500).json({
            code: 'ERROR_DELETING_STORE',
            message: 'Erro ao excluir loja.'
        })
    }
};