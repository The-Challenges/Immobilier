const express = require('express');
const router = express.Router();
const LandController = require('../../controller/walid Controller/landController');

router.get('/alllands',LandController.getAllLands)
router.get('/filterlands',LandController.filterLands)
router.get('/allviews', LandController.getAllViews);
router.post('/createlands',LandController.createlands)

module.exports = router;