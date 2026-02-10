
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seed from '../models/Seed.js';
import Service from '../models/Service.js';

dotenv.config();

const servicesData = [
    {
        title: 'Garden Consultation',
        description: 'Expert advice on garden layout, plant selection, and soil health.',
        price: 500,
        duration: '1 hour',
        category: 'Consultation'
    },
    {
        title: 'Lawn Mowing & Maintenance',
        description: 'Regular lawn mowing, edging, and debris removal.',
        price: 1200,
        duration: '2 hours',
        category: 'Maintenance'
    },
    {
        title: 'Planting Service',
        description: 'Professional planting of trees, shrubs, and flowers.',
        price: 2500,
        duration: 'Half day',
        category: 'Installation'
    },
    {
        title: 'Irrigation Setup',
        description: 'Installation of drip irrigation or sprinkler systems.',
        price: 5000,
        duration: '1 day',
        category: 'Installation'
    }
];

const seedDB = async () => {
    try {
        console.log('Connecting...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('Connected.');

        // Seed Services
        await Service.deleteMany({}); // Clear existing if any (none found earlier)
        await Service.insertMany(servicesData);
        console.log('Services seeded.');

        // Fix Product Images with comprehensive image mapping
        const products = await Seed.find({});
        console.log(`Found ${products.length} products.`);

        // Comprehensive image mapping for seed products
        const imageMap = {
            'tomato': 'https://images.unsplash.com/photo-1592924357615-bc4b357a1d85?w=500&q=80&auto=format&fit=crop',
            'chilli': 'https://images.unsplash.com/photo-1599599810694-c5784de68da8?w=500&q=80&auto=format&fit=crop',
            'brinjal': 'https://images.unsplash.com/photo-1599599810999-9f1cf1b8de74?w=500&q=80&auto=format&fit=crop',
            'basil': 'https://images.unsplash.com/photo-1599599810753-5b77b4c86e8d?w=500&q=80&auto=format&fit=crop',
            'marigold': 'https://images.unsplash.com/photo-1599599810753-8b59ff0f9f8f?w=500&q=80&auto=format&fit=crop',
            'tulsi': 'https://images.unsplash.com/photo-1599421490544-ad260f9e7528?w=400&q=80&auto=format&fit=crop',
            'sunflower': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80&auto=format&fit=crop',
            'carrot': 'https://images.unsplash.com/photo-1599599810737-24a94b7d5d38?w=500&q=80&auto=format&fit=crop',
            'spinach': 'https://images.unsplash.com/photo-1599599809649-423d4d6ae8c5?w=500&q=80&auto=format&fit=crop',
            'pumpkin': 'https://images.unsplash.com/photo-1599599810437-c4f1f9b0d5e5?w=500&q=80&auto=format&fit=crop',
        };

        const updates = products.map(p => {
            let newImage = p.image;

            // If image is missing or invalid, assign one from our map
            if (!p.image || p.image.length < 10 || !p.image.startsWith('http')) {
                const productKey = p.name.toLowerCase();
                
                // Try to find a match in imageMap
                for (const [key, url] of Object.entries(imageMap)) {
                    if (productKey.includes(key)) {
                        newImage = url;
                        break;
                    }
                }
                
                // Fallback if no match found
                if (newImage === p.image) {
                    newImage = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80&auto=format&fit=crop';
                }
            }

            console.log(`Updating ${p.name} with image: ${newImage}`);
            return Seed.findByIdAndUpdate(p._id, { image: newImage });
        });

        await Promise.all(updates);
        console.log('Product images updated successfully.');

    } catch (err) {
        console.error('SEEDING ERROR:', err.message);
        if (err.code) console.error('Error Code:', err.code);
        if (err.keyValue) console.error('Key Value:', err.keyValue);
        
        // If it's a replica set acknowledgment error but updates went through, still succeed
        if (err.codeName === 'NotWritablePrimary' && err.result?.modifiedCount > 0) {
            console.log(`✓ ${err.result.modifiedCount} products were updated with images (replica set warning)`);
        }
    } finally {
        try {
            await mongoose.disconnect();
        } catch (e) {
            console.error('Disconnect error:', e.message);
        }
        setTimeout(() => process.exit(0), 500);

    }
};

seedDB();
