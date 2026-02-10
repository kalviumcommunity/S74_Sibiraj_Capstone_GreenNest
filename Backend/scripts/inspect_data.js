
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seed from '../models/Seed.js';
import Service from '../models/Service.js';

dotenv.config();

console.log('Script started');

const inspect = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const products = await Seed.find({}).limit(5);
        console.log('--- Products (First 5) ---');
        products.forEach(p => {
            console.log(`Name: ${p.name}, Image: ${p.image}`);
        });

        const services = await Service.find({});
        console.log('\n--- Services ---');
        console.log(`Total Services: ${services.length}`);
        services.forEach(s => {
            console.log(`Title: ${s.title}, Category: ${s.category}`);
        });

    } catch (err) {
        console.error('ERROR OCCURRED:');
        console.error(err);
        process.exit(1);
    } finally {
        try {
            await mongoose.disconnect();
            console.log('Disconnected');
        } catch (e) { console.error('Disconnect error', e); }
        process.exit(0);
    }
};

inspect();
