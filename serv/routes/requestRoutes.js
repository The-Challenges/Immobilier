const express = require('express');
const router = express.Router();
const LandController = require('../controller/request/request');
router.get('/seller/:userId/:type',LandController.getAllEstateBySeller)
router.get('/:userId/:type',LandController.getAllEstateByBuyer)
router.post('/:userId/:houseId/:type',LandController.createRequest)
router.get('/estate/:estateId/:type',LandController.getAllRequestByEstateId)
router.post('/updateLandRequestStatus/:requestId', LandController.updateLandRequestStatus);
router.post('/updateStatus/:requestId', LandController.updateRequestStatus);







module.exports = router;