const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRoutes = require('./routes/seedRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Use seed routes
app.use('/api/seeds', seedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
