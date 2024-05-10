const express = require('express');
const router = express.Router();
const LandController = require('../controller/landController/land');

router.get('/alllands',LandController.getAllLands)
router.post('/createlands',LandController.createlands)

module.exports = router;