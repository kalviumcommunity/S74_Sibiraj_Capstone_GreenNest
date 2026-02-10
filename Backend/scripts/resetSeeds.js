/**
 * Clean seed database and properly seed with images
 * Run: node scripts/resetSeeds.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seed from '../models/Seed.js';

dotenv.config();

const seedsWithImages = [
  {
    name: 'Tomato',
    category: 'vegetable',
    price: 50,
    description: 'Organic tomato seeds',
    image: 'https://images.unsplash.com/photo-1592924357615-bc4b357a1d85?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Vermicompost every 7 days',
    wateringFrequency: '2-3 times per week',
    sunlightNeeds: '6-8 hours',
    stock: 100,
    ecoPoints: 5
  },
  {
    name: 'Chilli',
    category: 'vegetable',
    price: 40,
    description: 'Organic chilli seeds',
    image: 'https://images.unsplash.com/photo-1599599810694-c5784de68da8?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Organic compost with vermicompost',
    wateringFrequency: 'When top inch is dry',
    sunlightNeeds: '6-8 hours',
    stock: 80,
    ecoPoints: 4
  },
  {
    name: 'Brinjal',
    category: 'vegetable',
    price: 45,
    description: 'Organic brinjal seeds',
    image: 'https://images.unsplash.com/photo-1599599810999-e5a5e3a5e5e5?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'DAP + Super Phosphate',
    wateringFrequency: 'Keep soil moist',
    sunlightNeeds: '6-8 hours',
    stock: 60,
    ecoPoints: 4
  },
  {
    name: 'Basil',
    category: 'herb',
    price: 35,
    description: 'Sweet basil seeds',
    image: 'https://images.unsplash.com/photo-1599599810753-5b77b4c86e8d?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Light organic feed',
    wateringFrequency: 'Regular',
    sunlightNeeds: '6+ hours',
    stock: 50,
    ecoPoints: 3
  },
  {
    name: 'Marigold',
    category: 'flower',
    price: 30,
    description: 'Marigold flower seeds',
    image: 'https://images.unsplash.com/photo-1599599810753-8b59ff0f9f8f?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Balanced fertilizer',
    wateringFrequency: 'Moderate',
    sunlightNeeds: 'Full sun',
    stock: 70,
    ecoPoints: 3
  },
  {
    name: 'Sunflower Seed',
    category: 'flower',
    price: 60,
    description: 'Bright yellow sunflower seeds',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Light feeding monthly',
    wateringFrequency: 'When soil is dry',
    sunlightNeeds: 'Full sun (8+ hours)',
    stock: 75,
    ecoPoints: 4
  },
  {
    name: 'Carrot',
    category: 'vegetable',
    price: 50,
    description: 'Orange carrot seeds',
    image: 'https://images.unsplash.com/photo-1599599810737-24a94b7d5d38?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Phosphate fertilizer',
    wateringFrequency: '2 times per week',
    sunlightNeeds: '6 hours minimum',
    stock: 90,
    ecoPoints: 4
  },
  {
    name: 'Spinach',
    category: 'vegetable',
    price: 40,
    description: 'Nutritious spinach seeds',
    image: 'https://images.unsplash.com/photo-1599599809649-423d4d6ae8c5?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Nitrogen-rich compost',
    wateringFrequency: 'Keep soil moist',
    sunlightNeeds: 'Partial shade',
    stock: 85,
    ecoPoints: 3
  },
  {
    name: 'Pumpkin Seed',
    category: 'vegetable',
    price: 30,
    description: 'Large pumpkin seeds',
    image: 'https://images.unsplash.com/photo-1599599810437-c4f1f9b0d5e5?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Compost and manure',
    wateringFrequency: 'Deep watering 2x week',
    sunlightNeeds: 'Full sun',
    stock: 65,
    ecoPoints: 3
  },
  {
    name: 'Tulsi Seeds',
    category: 'medicinal',
    price: 25,
    description: 'Holy basil medicinal seeds',
    image: 'https://images.unsplash.com/photo-1599421490544-ad260f9e7528?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Mild organic feed',
    wateringFrequency: '3-4 times per week',
    sunlightNeeds: '4-6 hours',
    stock: 100,
    ecoPoints: 5
  },
  {
    name: 'Lotus',
    category: 'herb',
    price: 1000,
    description: 'Sacred lotus flower seeds',
    image: 'https://images.unsplash.com/photo-1564514200464-9f0982fcd934?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Water plants with aquatic fertilizer',
    wateringFrequency: 'Daily in water',
    sunlightNeeds: 'Full sun',
    stock: 20,
    ecoPoints: 10
  },
  {
    name: 'Beetroot',
    category: 'vegetable',
    price: 50,
    description: 'Red beetroot seeds',
    image: 'https://images.unsplash.com/photo-1599599810519-d1a9c3f16e5e?w=500&q=80&auto=format&fit=crop',
    fertilizerSuggestion: 'Balanced organic fertilizer',
    wateringFrequency: 'Regular watering',
    sunlightNeeds: '6 hours minimum',
    stock: 70,
    ecoPoints: 3
  }
];

async function resetSeeds() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✓ Connected\n');

    console.log('🗑️  Clearing existing seeds...');
    const deleteResult = await Seed.deleteMany({});
    console.log(`✓ Deleted ${deleteResult.deletedCount} old seeds\n`);

    console.log('📦 Seeding fresh seeds with images...');
    const insertResult = await Seed.insertMany(seedsWithImages);
    console.log(`✓ Inserted ${insertResult.length} seeds\n`);

    console.log('✅ Seed Database Reset Complete!\n');
    console.log('📋 Seeded Products:');
    insertResult.forEach((seed, idx) => {
      console.log(`   ${idx + 1}. ${seed.name} (${seed.category}) - ₹${seed.price}`);
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.insertedDocs && err.insertedDocs.length > 0) {
      console.log(`\n⚠️  Despite error, ${err.insertedDocs.length} seeds were inserted successfully`);
      process.exit(0);
    }
    process.exit(1);
  }
}

resetSeeds();
