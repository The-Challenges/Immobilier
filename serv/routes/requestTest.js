const express = require('express');
const router = express.Router();
const requestController = require('../controller/testRe/controllerrequest');

// Route to create a new request
router.post('/:userId/:landId', requestController.createRequest);
router.post('/request/:userId/:houseId',requestController.createRequestHouse)

router.put('/update-land-request/:userId/:landId', requestController.updateRequestLand);

router.put('/update-house-request/:userId/:houseId', requestController.updateRequestHouse);


router.get('/requests/owner/:userId/:type', requestController.getRequestByOwner)
router.get('/check',requestController.check)

module.exports = router;