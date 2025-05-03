const express = require('express');
const router = express.Router();
const { getSeeds ,addSeed} = require('../controllers/seedController');

// GET route
router.get('/', getSeeds);



module.exports = router;
