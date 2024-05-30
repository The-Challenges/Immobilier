const express = require('express');
const router = express.Router();
const LandController = require('../controller/landController/land');

// router.get('/all', LandController.getAllLands);
// router.post('/postMany', LandController.insertAllHouses);
router.post('/AddLand', LandController.addLand);
router.post('/AddAccess/:landId', LandController.addAccessToLand);
router.post('/AddView/:landId', LandController.addViewToLand); // New route for adding view to land
// router.put('/updateLand/:landId', LandController.updateLand); // Route for updating land
// router.get('/user/:userId', LandController.getLandsByUser);
// router.get('/:id', LandController.getLandById);

router.get('/alllands',LandController.getAllLands)
router.get('/filterlands',LandController.filterLands)
router.get('/allviews', LandController.getAllViews);
// router.post('/createlands',LandController.createlands)
module.exports = router;