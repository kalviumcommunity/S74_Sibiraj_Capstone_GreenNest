/**
 * Drops the legacy username_1 index from users collection.
 * Run once: node scripts/dropUsernameIndex.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function dropUsernameIndex() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  const col = db.collection('users');
  const indexes = await col.indexes();
  const usernameIndex = indexes.find((i) => i.name === 'username_1');
  if (usernameIndex) {
    await col.dropIndex('username_1');
    console.log('Dropped legacy username_1 index');
  } else {
    console.log('No username_1 index found (already clean)');
  }
  process.exit(0);
}

dropUsernameIndex().catch((e) => {
  console.error(e);
  process.exit(1);
});
