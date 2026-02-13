import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import storeRoutes from './routes/store.routes.js';
import productRoutes from './routes/product.routes.js';
import productStockRoutes from './routes/product.stock.routes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes );

app.use('/api/stores', storeRoutes);

app.use('/api/products', productRoutes);

app.use('/api/products/stock', productStockRoutes);

export default app;