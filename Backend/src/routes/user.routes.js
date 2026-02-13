import { Router } from 'express';
import { login, register, assignStore } from '../controller/user.controller.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/assign/store/:storeId', authenticateToken,assignStore);

export default router;