const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = "greennest_secret_key";

// Dummy login route – later replace with real user DB
router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ message: "Username required" });

  const user = { username }; 

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
