const express = require('express');
const router = express.Router();
const LandController = require('../controller/request/request');

router.get('/:userId/:type',LandController.getAllEstateByBuyer)
router.post('/:userId/:houseId/type',LandController.createRequset)

module.exports = router;