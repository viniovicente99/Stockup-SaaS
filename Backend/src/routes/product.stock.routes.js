import { Router } from 'express';
import { deleteStock, getAllStock, getStockByStore, updateStock } from '../controller/product.stock.controller.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

router.get('/all', authenticateToken, getAllStock);

router.get('/store/:storeInternalID', authenticateToken, getStockByStore);

router.patch('/edit/:stockID', authenticateToken, updateStock );

router.delete('/delete/:stockID', authenticateToken, deleteStock);


export default router;