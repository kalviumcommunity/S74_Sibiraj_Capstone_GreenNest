import express from 'express';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/my', verifyToken, getMyBookings);
router.get('/', verifyToken, requireAdmin, getAllBookings);
router.put('/:id', verifyToken, requireAdmin, updateBookingStatus);

export default router;
