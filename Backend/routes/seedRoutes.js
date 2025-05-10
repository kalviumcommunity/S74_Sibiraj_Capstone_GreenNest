const express = require('express');
const router = express.Router();
const { getSeeds, addSeed } = require('../controllers/seedController');


router.get('/', getSeeds);



router.post('/', addSeed);

module.exports = router;
