/**
 * Order controller - create order, get user orders
 */
import Order from '../models/Order.js';
import Seed from '../models/Seed.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  try {
    const { products } = req.body; // [{ seedId, quantity }]
    if (!products?.length) return res.status(400).json({ message: 'Products required' });

    let totalPrice = 0;
    const orderItems = [];

    for (const item of products) {
      const seed = await Seed.findById(item.seedId);
      if (!seed) return res.status(404).json({ message: `Seed ${item.seedId} not found` });
      const qty = Math.max(1, item.quantity || 1);
      const stock = seed.stock ?? 0;
      if (stock < qty) return res.status(400).json({ message: `Insufficient stock for ${seed.name}` });

      const price = seed.price ?? 0;
      orderItems.push({ seedId: seed._id, name: seed.name, quantity: qty, price });
      totalPrice += price * qty;

      seed.stock = (seed.stock ?? 0) - qty;
      await seed.save();
    }

    const order = await Order.create({
      userId: req.user.id,
      products: orderItems,
      totalPrice,
      status: 'pending',
    });

    // Award eco points (e.g. 1 point per 10₹)
    const points = Math.floor(totalPrice / 10);
    await User.findByIdAndUpdate(req.user.id, { $inc: { ecoPoints: points } });

    res.status(201).json(order);
  } catch (err) {
    console.error('Order create error:', err);
    res.status(500).json({ message: err.message || 'Error creating order' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
