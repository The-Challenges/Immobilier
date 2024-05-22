const express = require('express');
const router = express.Router();


const HouseController = require('../../controller/walid Controller/houseController');


router.get('/allhouses', HouseController.getAllHouses);
router.post('/createhouses', HouseController.createHouses);
router.get('/filterhouses', HouseController.filterHouses);
router.get('/coordhouse', HouseController.getHouseCoordinates);
router.get('/allindoor', HouseController.getAllIndoorOptions);
router.get('/alloutdoor', HouseController.getAllOutdoorOptions); // Add this line
 // Add this line



module.exports = router;