import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    pointsRequired: { type: Number, required: true },
  },
  { timestamps: true }
);

const Reward = mongoose.model('Reward', rewardSchema);
export default Reward;
