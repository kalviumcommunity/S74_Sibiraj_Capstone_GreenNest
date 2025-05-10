const Seed = require('../models/Seed');


const getSeeds = async (req, res) => {
  try {
    const seeds = await Seed.find();
    res.status(200).json(seeds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addSeed = async (req, res) => {
  const { name, category, price, stock, image, ecoPoints } = req.body;

  const newSeed = new Seed({
    name,
    category,
    price,
    stock,
    image,
    ecoPoints,
  });

  try {
    const savedSeed = await newSeed.save();
    res.status(201).json(savedSeed);
  } catch (err) {
    console.error("❌ Error saving seed:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSeeds, addSeed };
