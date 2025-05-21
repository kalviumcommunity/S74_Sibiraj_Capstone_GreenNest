const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');
const authenticateToken = require('../middleware/authMiddleware');

// Public
router.get('/', seedController.getSeeds);

// Protected
router.post('/', authenticateToken, seedController.addSeed);
router.put('/:id', authenticateToken, seedController.updateSeed);
router.delete('/:id', authenticateToken, seedController.deleteSeed);

module.exports = router;
