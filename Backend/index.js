const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const seedRoutes = require('./routes/seedRoutes');

app.use('/', authRoutes);
app.use('/seeds', seedRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB ✅');

  // Start server only after DB is connected
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB ❌', err);
});
  