const express = require('express');
const router = express.Router();
const HouseController = require('../controller/houseController/house');

// Route to get all houses
router.get('/allhouses', HouseController.getAllHouses);

// Route to insert multiple houses
router.post('/postMany', HouseController.insertAllHouses);

// Route to add a new house
router.post('/postHouse', HouseController.addHouse);

// Route to add indoor option to a house
router.post('/addIndoor/:houseId', HouseController.addIndoorOptionToHouse);

// Route to add outdoor option to a house
router.post('/addOutdoor/:houseId', HouseController.addOutdoorOptionToHouse);

// Route to add climate feature to a house
router.post('/addClimate/:houseId', HouseController.addClimateFeatureToHouse);

// Route to update a specific house
router.put('/updateHouse/:id', HouseController.updateHouse);

module.exports = router;
