/**
 * Reward controller - list rewards
 */
import Reward from '../models/Reward.js';

export const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find().sort({ pointsRequired: 1 });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rewards' });
  }
};
