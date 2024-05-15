const express = require('express');
const router = express.Router();

// Assuming you have a houseController that handles the logic for house-related operations
// const houseController = require('../controller/houseController/house');

// Route to get all houses
// router.get('/all', houseController.getAllHouses);

// Route to create a new house entry
// router.post('/create', houseController.createHouse);

// Route to update an existing house entry
// router.put('/update/:houseId', houseController.updateHouse);

// Route to delete a house entry
// router.delete('/delete/:houseId', houseController.deleteHouse);

// Route to get a specific house by ID
// router.get('/:houseId', houseController.getHouseById);
// const HouseController = require('../controller/house');
const HouseController = require('../controller/houseController/house');

router.get('/allhouses', HouseController.getAllHouses);
router.post('/createhouses', HouseController.createHouses);
router.get('/filterhouses', HouseController.filterHouses);
router.get('/coordhouse', HouseController.getHouseCoordinates);


module.exports = router;
