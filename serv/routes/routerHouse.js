const express = require('express');
const router = express.Router();
const HouseController = require('../controller/houseController/house');

router.get('/allhouses', HouseController.getAllHouses);
router.post('/postMany', HouseController.insertAllHouses);

module.exports = router;
