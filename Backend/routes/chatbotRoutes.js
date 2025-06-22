import express from 'express';
import { suggestFertilizer } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/', suggestFertilizer);

export default router;
