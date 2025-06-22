import mongoose from "mongoose";

const seedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  stock: Number,
  image: String,
  ecoPoints: Number,
}, {
  timestamps: true,
});


const Seed = mongoose.model('Seed', seedSchema);


export default Seed;

