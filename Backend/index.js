import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';

dotenv.config();
const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/seeds', seedRoutes);
app.use('/api/chatbot', chatbotRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port", process.env.PORT || 5000)
    );
  })
  .catch((err) => console.log(err));
