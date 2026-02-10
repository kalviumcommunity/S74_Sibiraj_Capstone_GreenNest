import express from 'express';
import {
  getAnalytics,
  getAllUsers,
  deleteUser,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  addReward,
  deleteReward,
} from '../controllers/adminController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.use(verifyToken, requireAdmin);

router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.post('/products', addProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/orders', getAllOrders);
router.patch('/orders/:id', updateOrderStatus);
router.post('/rewards', addReward);
router.delete('/rewards/:id', deleteReward);

export default router;
