import express from 'express';
import {
  listServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', listServices);
router.get('/:id', getServiceById);
router.post('/', verifyToken, requireAdmin, createService);
router.put('/:id', verifyToken, requireAdmin, updateService);
router.delete('/:id', verifyToken, requireAdmin, deleteService);

export default router;
