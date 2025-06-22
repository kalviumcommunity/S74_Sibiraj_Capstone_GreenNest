import express from 'express';
import { getEcoPoints, addEcoPoints } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/points', verifyToken, getEcoPoints);
router.post('/add-points', verifyToken, addEcoPoints);

export default router;
