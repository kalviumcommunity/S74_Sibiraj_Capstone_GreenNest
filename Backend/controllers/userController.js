import User from '../models/User.js';

export const getEcoPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ ecoPoints: user.ecoPoints });
  } catch {
    res.status(500).json({ message: 'Error fetching points' });
  }
};

export const addEcoPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.ecoPoints += req.body.points;
    await user.save();
    res.json({ ecoPoints: user.ecoPoints });
  } catch {
    res.status(500).json({ message: 'Error updating points' });
  }
};
