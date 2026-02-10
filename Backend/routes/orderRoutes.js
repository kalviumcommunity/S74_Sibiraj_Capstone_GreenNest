import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getMyOrders);

export default router;
