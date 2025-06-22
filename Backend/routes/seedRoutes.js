import express from 'express';
import { getAllSeeds, addSeed } from '../controllers/seedController.js';

const router = express.Router();

router.get('/', getAllSeeds);
router.post('/', addSeed);

export default router;
