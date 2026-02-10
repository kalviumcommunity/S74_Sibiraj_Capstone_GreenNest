import express from 'express';
import { chat, suggestFertilizer } from '../controllers/chatbotController.js';

const router = express.Router();
router.post('/', chat);
router.post('/fertilizer', suggestFertilizer);

export default router;
