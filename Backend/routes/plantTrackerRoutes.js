import express from 'express';
import { addPlant, updatePlant, getMyPlants } from '../controllers/plantTrackerController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', verifyToken, addPlant);
router.get('/', verifyToken, getMyPlants);
router.patch('/:id', verifyToken, updatePlant);

export default router;
