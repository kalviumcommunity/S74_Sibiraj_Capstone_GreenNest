import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import plantTrackerRoutes from './routes/plantTrackerRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js';
import seedExchangeRoutes from './routes/seedExchangeRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://greennesst.netlify.app', 'https://dreamy-cendol-8e47bc.netlify.app'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/seeds', seedRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tracker', plantTrackerRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/seed-exchange', seedExchangeRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check - helps verify backend is running latest code
app.get('/api/health', (req, res) => res.json({ ok: true, routes: ['auth', 'products', 'services', 'bookings', 'orders'] }));

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port', process.env.PORT || 5000);
    console.log('Routes: /api/auth, /api/products, /api/services, /api/bookings, /api/orders, etc.');
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
