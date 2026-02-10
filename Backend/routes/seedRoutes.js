import express from 'express';
import { getAllSeeds } from '../controllers/seedController.js';

const router = express.Router();
router.get('/', getAllSeeds);

export default router;
