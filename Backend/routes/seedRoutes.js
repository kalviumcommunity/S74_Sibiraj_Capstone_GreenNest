const express = require('express');
const router = express.Router();
const { getSeeds, addSeed, updateSeed } = require('../controllers/seedController');


router.get('/', getSeeds);            
router.post('/', addSeed);            
router.put('/:id', updateSeed);       

module.exports = router;
