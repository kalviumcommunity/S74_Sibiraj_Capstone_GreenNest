import Seed from '../models/Seed.js';

export const getAllSeeds = async (req, res) => {
  try {
    const seeds = await Seed.find();
    res.json(seeds);
  } catch {
    res.status(500).json({ message: 'Error fetching seeds' });
  }
};

export const addSeed = async (req, res) => {
  try {
    const newSeed = new Seed(req.body);
    await newSeed.save();
    res.status(201).json(newSeed);
  } catch {
    res.status(500).json({ message: 'Error adding seed' });
  }
};
