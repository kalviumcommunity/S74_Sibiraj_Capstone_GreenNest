import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists with this email' });

    const usernameExist = await User.findOne({ username });
    if (usernameExist) return res.status(400).json({ message: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    if (err?.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0];
      return res.status(400).json({ message: `${field === 'email' ? 'Email' : 'Username'} already exists` });
    }
    console.error('Register error:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getEcoPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ ecoPoints: user.ecoPoints });
  } catch {
    res.status(500).json({ message: 'Error fetching points' });
  }
};

export const addEcoPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.ecoPoints += req.body.points;
    await user.save();
    res.json({ ecoPoints: user.ecoPoints });
  } catch {
    res.status(500).json({ message: 'Error updating points' });
  }
};
