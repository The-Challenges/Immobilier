const express = require('express');
const router = express.Router();
const LandController = require('../controller/landController/land');

router.get('/all',LandController.getAllHouses)
router.post('/postMany',LandController.insertAllHouses)

module.exports = router;