/**
 * Run: node scripts/seedServices.js
 * Seeds sample garden setup services
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const services = [
  { title: 'Terrace Garden Setup', description: 'Complete terrace garden design and setup including planters, soil, and initial planting', price: 5000, duration: '4-6 hours', category: 'terrace' },
  { title: 'Balcony Garden Setup', description: 'Compact balcony garden with vertical planters and suitable plants', price: 2500, duration: '2-3 hours', category: 'balcony' },
  { title: 'Vermicompost Setup', description: 'Vermicompost bin setup with worms and training', price: 1500, duration: '1-2 hours', category: 'vermicompost' },
  { title: 'Monthly Maintenance Visit', description: 'Regular garden maintenance including pruning, fertilizing, and pest check', price: 800, duration: '1-2 hours', category: 'maintenance' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Service.insertMany(services);
  console.log('Services seeded');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
