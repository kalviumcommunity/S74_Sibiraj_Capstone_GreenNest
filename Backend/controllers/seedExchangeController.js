/**
 * Seed exchange controller - post, request, list
 */
import SeedExchange from '../models/SeedExchange.js';
import User from '../models/User.js';

export const postSeed = async (req, res) => {
  try {
    const { seedName, quantity, location } = req.body;
    if (!seedName || !quantity || !location) {
      return res.status(400).json({ message: 'seedName, quantity, location required' });
    }

    const listing = await SeedExchange.create({
      userId: req.user.id,
      seedName,
      quantity,
      location,
      status: 'available',
    });
    // Award participation points
    await User.findByIdAndUpdate(req.user.id, { $inc: { ecoPoints: 2 } });
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Error posting seed' });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await SeedExchange.find({ status: 'available' })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings' });
  }
};

export const requestSeed = async (req, res) => {
  try {
    const listing = await SeedExchange.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.status !== 'available') return res.status(400).json({ message: 'Seed no longer available' });

    listing.status = 'requested';
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Error requesting seed' });
  }
};
