import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  seedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
