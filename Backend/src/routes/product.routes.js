import { Router } from 'express';
import { registerProduct, editProduct, getAllProducts, deleteProduct} from '../controller/product.controller.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

router.post('/register', authenticateToken, registerProduct);

router.get('/all', authenticateToken, getAllProducts);

router.put('/edit/:productID', authenticateToken, editProduct);

router.delete('/delete/:productID', authenticateToken, deleteProduct);

export default router;