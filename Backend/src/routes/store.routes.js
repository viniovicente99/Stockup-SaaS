import { Router } from 'express';
import { createStore, deleteStore, editStore, getStores, getStoresByID } from '../controller/store.controller.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

router.get('/all', authenticateToken, getStores);

router.get('/id/:storeInternalID', authenticateToken, getStoresByID);

router.post('/create', authenticateToken, createStore);

router.put('/edit/:storeInternalID', authenticateToken, editStore);

router.delete('/delete/:storeInternalID', authenticateToken, deleteStore);

export default router;
