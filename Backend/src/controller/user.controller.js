import pool from '../database/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate as isUUID } from 'uuid'

export const register = async (req, res) => {
    try {
        const {name, email, password, confirmPassword} = req.body;

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if (existingUser.rows.length > 0){
            return res.status(400).json({
                code: 'EMAIL_ALREADY_EXISTS',
                message: 'E-mail já cadastrado.'
            })
        };

        if (password !== confirmPassword) {
            return res.status(403).json({
                code: 'PASSWORDS_UNMATCH',
                message: 'As senhas não coincidem.'
            })
        };

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        )

        return res.status(201).json({
            code: 'REGISTER_SUCCESS',
            message: 'Usuário criado com sucesso.'
        })

    } catch (err){
        console.log(err);
        return res.status(500).json({
            code: 'ERROR_CREATING_ACCOUNT',
            message: 'Erro ao criar conta.'
        });
    }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                code: 'EMPTY_FIELDS',
                message: 'Todos os campos são obrigatórios.'
            })
        };

        const { rows } = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = rows[0];

        if(!user){
            return res.status(401).json({
                code: 'INCORRECT_CREDENTIALS',
                message: 'E-mail ou senha incorretos.'
            })
        };

        const match = await bcrypt.compare(password, user.password);

        if(match){
            const accessToken = jwt.sign({id: user.id, email: user.email, name: user.name},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1d'});
            
            const userCredentials = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            return res.json({ accessToken: accessToken, userCredentials: userCredentials});
        } else {
            return res.status(401).json({
                code: 'INCORRECT_CREDENTIALS',
                message: 'E-mail ou senha incorretos.'
            })
        };
        } catch (err){
            console.log(err);
            return res.status(500).json({
                code: 'LOGIN_ERROR',
                message: 'Erro ao fazer login.'
            })
        };
};

export const assignStore = async (req, res) => {
    try{
        const {storeId} = req.params;

        const userId = req.user.id;

        if (!isUUID(storeId) || !isUUID(userId)) {
            return res.status(400).json({
                code: 'EMPTY_ID',
                message: 'O ID é obrigatório'
            })
        };

        await pool.query(
            "INSERT INTO store_users (store_id, user_id) VALUES ($1, $2)",
            [storeId, userId]
        )

        return res.status(201).json({
            code: 'USER_ASSIGN_SUCCESS',
            message: 'Usuário associada a loja com sucesso.'
        })
    } catch(err){

        if(err.code === '23505'){
            return res.status(409).json({
                code: 'USER_ALREADY_ASSIGNED',
                message: 'Usuário já associado a loja.'
            })
        };

        if(err.code === '23503'){
            return res.status(500).json({
                code: 'STORE_NOT_FOUND',
                message: 'Loja não encontrada.'
            })
        };

        return res.status(500).json({
                code: 'ASSIGN_ERROR',
                message: 'Erro ao associar usuário a loja.'
            })
    }
};