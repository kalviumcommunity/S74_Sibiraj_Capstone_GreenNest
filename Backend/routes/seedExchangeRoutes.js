import express from 'express';
import { postSeed, getAllListings, requestSeed } from '../controllers/seedExchangeController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getAllListings); // public
router.post('/', verifyToken, postSeed);
router.post('/:id/request', verifyToken, requestSeed);

export default router;
