const express = require('express');
const router = express.Router();
const HouseController = require('../controller/houseController/house');

router.get('/allhouses', HouseController.getAllHouses);
router.post('/createhouses', HouseController.createHouses);
router.get('/filterhouses', HouseController.filterHouses);
router.get('/coordhouse', HouseController.getHouseCoordinates);


module.exports = router;
