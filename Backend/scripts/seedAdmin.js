/**
 * Run: node scripts/seedAdmin.js
 * Creates an admin user. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env or pass as args.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || process.argv[2] || 'admin@greennest.com';
  const password = process.env.ADMIN_PASSWORD || process.argv[3] || 'admin123';

  await mongoose.connect(process.env.MONGO_URI);
  const exists = await User.findOne({ email });
  if (exists) {
    exists.role = 'admin';
    exists.password = await bcrypt.hash(password, 10);
    await exists.save();
    console.log('Admin updated:', email);
  } else {
    await User.create({
      name: 'Admin',
      email,
      password: await bcrypt.hash(password, 10),
      role: 'admin',
    });
    console.log('Admin created:', email);
  }
  process.exit(0);
}

seedAdmin().catch((e) => {
  console.error(e);
  process.exit(1);
});
