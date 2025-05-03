const Seed = require('../models/Seed');


const getSeeds = async (req, res) => {
  try {
    const seeds = await Seed.find();
    res.status(200).json(seeds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  

module.exports = { getSeeds ,addSeed};
