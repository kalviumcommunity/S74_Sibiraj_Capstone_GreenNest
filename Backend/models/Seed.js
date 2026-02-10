import mongoose from 'mongoose';

const seedSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
    fertilizerSuggestion: { type: String, default: '' },
    wateringFrequency: { type: String, default: '' },
    sunlightNeeds: { type: String, default: '' },
    stock: { type: Number, default: 0 },
    image: { type: String, default: '' },
    ecoPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Seed = mongoose.model('Seed', seedSchema);
export default Seed;
