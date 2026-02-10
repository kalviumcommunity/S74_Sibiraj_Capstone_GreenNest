import mongoose from 'mongoose';

const seedExchangeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seedName: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ['available', 'requested', 'exchanged'], default: 'available' },
  },
  { timestamps: true }
);

const SeedExchange = mongoose.model('SeedExchange', seedExchangeSchema);
export default SeedExchange;
