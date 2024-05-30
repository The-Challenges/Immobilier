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
// router.put('/updateHouse/:id', HouseController.updateHouse);
router.get('/user/:userId', HouseController.getHousesByUser);

// router.get('/:id', HouseController.getHouseById)
// router.post('/createhouses', HouseController.createHouses);
router.get('/filterhouses', HouseController.filterHouses);
router.get('/coordhouse', HouseController.getHouseCoordinates);
router.get('/allindoor', HouseController.getAllIndoorOptions);
router.get('/alloutdoor', HouseController.getAllOutdoorOptions); 
module.exports = router;