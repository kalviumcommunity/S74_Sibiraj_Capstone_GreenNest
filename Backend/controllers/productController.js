/**
 * Product/Seed controller - browse, search, filter, get by id
 */
import Seed from '../models/Seed.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = new RegExp(category, 'i');
    if (search) filter.$or = [
      { name: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];
    if (minPrice != null || maxPrice != null) {
      filter.price = {};
      if (minPrice != null) filter.price.$gte = Number(minPrice);
      if (maxPrice != null) filter.price.$lte = Number(maxPrice);
    }

    const products = await Seed.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Seed.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};
