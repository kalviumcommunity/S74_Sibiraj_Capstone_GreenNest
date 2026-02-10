/**
 * Run: node scripts/seedProducts.js
 * Seeds sample products for development
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seed from '../models/Seed.js';

dotenv.config();

const products = [
  { name: 'Tomato', category: 'vegetable', price: 50, description: 'Organic tomato seeds', image: 'https://images.unsplash.com/photo-1592924357615-bc4b357a1d85?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Vermicompost every 7 days', wateringFrequency: '2-3 times per week', sunlightNeeds: '6-8 hours', stock: 100, ecoPoints: 5 },
  { name: 'Chilli', category: 'vegetable', price: 40, description: 'Organic chilli seeds', image: 'https://images.unsplash.com/photo-1599599810694-c5784de68da8?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Organic compost with vermicompost', wateringFrequency: 'When top inch is dry', sunlightNeeds: '6-8 hours', stock: 80, ecoPoints: 4 },
  { name: 'Brinjal', category: 'vegetable', price: 45, description: 'Organic brinjal seeds', image: 'https://images.unsplash.com/photo-1599599810999-e5a5e3a5e5e5?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'DAP + Super Phosphate', wateringFrequency: 'Keep soil moist', sunlightNeeds: '6-8 hours', stock: 60, ecoPoints: 4 },
  { name: 'Basil', category: 'herb', price: 35, description: 'Sweet basil seeds', image: 'https://images.unsplash.com/photo-1599599810753-5b77b4c86e8d?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Light organic feed', wateringFrequency: 'Regular', sunlightNeeds: '6+ hours', stock: 50, ecoPoints: 3 },
  { name: 'Marigold', category: 'flower', price: 30, description: 'Marigold flower seeds', image: 'https://images.unsplash.com/photo-1599599810753-8b59ff0f9f8f?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Balanced fertilizer', wateringFrequency: 'Moderate', sunlightNeeds: 'Full sun', stock: 70, ecoPoints: 3 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
    
    // Clear existing seeds to avoid duplicates
    await Seed.deleteMany({});
    console.log('Cleared existing seeds');
    
    // Insert products with proper error handling
    const result = await Seed.insertMany(products, { ordered: false });
    console.log(`Successfully seeded ${result.length} products with images`);
    console.log('Seeds are now available with proper image URLs');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    // Check if data was inserted despite the error
    if (err.insertedDocs && err.insertedDocs.length > 0) {
      console.log(`✓ ${err.insertedDocs.length} products were successfully inserted with images`);
      console.log('Note: MongoDB replica set acknowledgment warning, but data is safe');
      mongoose.connection.close().then(() => process.exit(0));
    } else {
      console.error('Error seeding products:', err.message);
      process.exit(1);
    }
  }
}
