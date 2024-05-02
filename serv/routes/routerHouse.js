const express = require('express');
const router = express.Router();
const HouseController = require('../controller/house');

router.get('/allhouses', HouseController.getAllHouses);
router.post('/posthouses', HouseController.createHouse);

module.exports = router;
