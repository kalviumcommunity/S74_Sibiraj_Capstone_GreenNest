import express from 'express';
import { getAllRewards } from '../controllers/rewardController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', verifyToken, getAllRewards);

export default router;
