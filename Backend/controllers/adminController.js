/**
 * Admin controller - manage products, users, orders, analytics
 */
import User from '../models/User.js';
import Seed from '../models/Seed.js';
import Order from '../models/Order.js';
import Reward from '../models/Reward.js';

export const getAnalytics = async (req, res) => {
  try {
    const [userCount, productCount, orderCount, totalRevenue] = await Promise.all([
      User.countDocuments(),
      Seed.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([{ $match: { status: { $ne: 'cancelled' } } }, { $group: { _id: null, total: { $sum: '$totalPrice' } } }]),
    ]);
    const revenue = totalRevenue[0]?.total || 0;
    res.json({ userCount, productCount, orderCount, revenue });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Seed.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Seed.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Seed.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order' });
  }
};

export const addReward = async (req, res) => {
  try {
    const reward = await Reward.create(req.body);
    res.status(201).json(reward);
  } catch (err) {
    res.status(500).json({ message: 'Error adding reward' });
  }
};

export const deleteReward = async (req, res) => {
  try {
    await Reward.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reward deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting reward' });
  }
};
