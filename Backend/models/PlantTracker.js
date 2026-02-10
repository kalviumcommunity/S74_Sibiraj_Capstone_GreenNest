import mongoose from 'mongoose';

const plantTrackerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed', required: true },
    seedName: { type: String, required: true },
    plantedDate: { type: Date, default: Date.now },
    growthStage: { type: String, enum: ['sowing', 'germination', 'seedling', 'vegetative', 'flowering', 'fruiting', 'harvest'], default: 'sowing' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const PlantTracker = mongoose.model('PlantTracker', plantTrackerSchema);
export default PlantTracker;
