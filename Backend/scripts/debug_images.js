
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seed from '../models/Seed.js';
import fs from 'fs';

dotenv.config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        let output = 'Connected to DB\n';

        const products = await Seed.find({});
        output += `Found ${products.length} products\n`;

        products.forEach(p => {
            output += `Product: "${p.name}"\n`;
            output += `  Image: "${p.image}"\n`;
            output += `  Length: ${p.image ? p.image.length : 0}\n`;
            output += '-------------------\n';
        });

        fs.writeFileSync('debug_output.txt', output);
        console.log('Output written to debug_output.txt');

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
};

debug();
