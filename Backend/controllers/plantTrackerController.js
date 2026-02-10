/**
 * Plant tracker controller - add plant, update stage, list plants
 */
import PlantTracker from '../models/PlantTracker.js';
import Seed from '../models/Seed.js';
import User from '../models/User.js';

const ECO_POINTS_PER_STAGE = 5;

export const addPlant = async (req, res) => {
  try {
    const { seedId } = req.body;
    const seed = await Seed.findById(seedId);
    if (!seed) return res.status(404).json({ message: 'Seed not found' });

    const tracker = await PlantTracker.create({
      userId: req.user.id,
      seedId,
      seedName: seed.name,
      plantedDate: new Date(),
      growthStage: 'sowing',
      notes: '',
    });
    res.status(201).json(tracker);
  } catch (err) {
    res.status(500).json({ message: 'Error adding plant' });
  }
};

export const updatePlant = async (req, res) => {
  try {
    const { growthStage, notes } = req.body;
    const tracker = await PlantTracker.findOne({ _id: req.params.id, userId: req.user.id });
    if (!tracker) return res.status(404).json({ message: 'Plant not found' });

    const prevStage = tracker.growthStage;
    if (growthStage) tracker.growthStage = growthStage;
    if (notes !== undefined) tracker.notes = notes;
    await tracker.save();

    // Award points when reaching new stage
    const stages = ['sowing', 'germination', 'seedling', 'vegetative', 'flowering', 'fruiting', 'harvest'];
    const prevIdx = stages.indexOf(prevStage);
    const newIdx = stages.indexOf(tracker.growthStage);
    if (newIdx > prevIdx) {
      await User.findByIdAndUpdate(req.user.id, { $inc: { ecoPoints: ECO_POINTS_PER_STAGE } });
    }

    res.json(tracker);
  } catch (err) {
    res.status(500).json({ message: 'Error updating plant' });
  }
};

export const getMyPlants = async (req, res) => {
  try {
    const plants = await PlantTracker.find({ userId: req.user.id }).sort({ plantedDate: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching plants' });
  }
};
