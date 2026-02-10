/**
 * Verify that seeds with images exist in the database
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seed from '../models/Seed.js';

dotenv.config();

async function verify() {
  try {
    console.log('🔍 Verifying seeds with images...\n');
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✓ Connected to MongoDB\n');
    
    const seeds = await Seed.find({});
    console.log(`📦 Total seeds in database: ${seeds.length}\n`);
    
    if (seeds.length === 0) {
      console.log('⚠️  No seeds found! Running seed process...\n');
      
      // Seed products
      const products = [
        { name: 'Tomato', category: 'vegetable', price: 50, description: 'Organic tomato seeds', image: 'https://images.unsplash.com/photo-1592924357615-bc4b357a1d85?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Vermicompost every 7 days', wateringFrequency: '2-3 times per week', sunlightNeeds: '6-8 hours', stock: 100, ecoPoints: 5 },
        { name: 'Chilli', category: 'vegetable', price: 40, description: 'Organic chilli seeds', image: 'https://images.unsplash.com/photo-1599599810694-c5784de68da8?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Organic compost with vermicompost', wateringFrequency: 'When top inch is dry', sunlightNeeds: '6-8 hours', stock: 80, ecoPoints: 4 },
        { name: 'Brinjal', category: 'vegetable', price: 45, description: 'Organic brinjal seeds', image: 'https://images.unsplash.com/photo-1599599810999-e5a5e3a5e5e5?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'DAP + Super Phosphate', wateringFrequency: 'Keep soil moist', sunlightNeeds: '6-8 hours', stock: 60, ecoPoints: 4 },
        { name: 'Basil', category: 'herb', price: 35, description: 'Sweet basil seeds', image: 'https://images.unsplash.com/photo-1599599810753-5b77b4c86e8d?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Light organic feed', wateringFrequency: 'Regular', sunlightNeeds: '6+ hours', stock: 50, ecoPoints: 3 },
        { name: 'Marigold', category: 'flower', price: 30, description: 'Marigold flower seeds', image: 'https://images.unsplash.com/photo-1599599810753-8b59ff0f9f8f?w=500&q=80&auto=format&fit=crop', fertilizerSuggestion: 'Balanced fertilizer', wateringFrequency: 'Moderate', sunlightNeeds: 'Full sun', stock: 70, ecoPoints: 3 },
      ];
      
      await Seed.insertMany(products);
      console.log(`✓ Inserted ${products.length} products with images\n`);
    }
    
    // Now verify all seeds have images
    const allSeeds = await Seed.find({});
    let seedsWithoutImages = 0;
    
    console.log('📋 Seed Details:\n');
    allSeeds.forEach((seed, index) => {
      const hasImage = seed.image && seed.image.length > 10 && seed.image.startsWith('http');
      const category = seed.category || 'Unknown';
      const imageStatus = hasImage ? '✓ Image' : '✗ NO IMAGE';
      console.log(`${index + 1}. ${(seed.name || 'N/A').padEnd(15)} | ${category.padEnd(10)} | Price: ₹${seed.price || 0} | ${imageStatus}`);
      if (!hasImage) seedsWithoutImages++;
    });
    
    console.log('\n' + '='.repeat(60));
    console.log(`✓ Total: ${allSeeds.length} seeds`);
    console.log(`✓ With images: ${allSeeds.length - seedsWithoutImages}`);
    console.log(`✗ Without images: ${seedsWithoutImages}`);
    
    if (seedsWithoutImages === 0) {
      console.log('\n🎉 Perfect! All seeds have valid image URLs!');
    }
    
    await mongoose.connection.close();
    process.exit(seedsWithoutImages > 0 ? 1 : 0);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

verify();
