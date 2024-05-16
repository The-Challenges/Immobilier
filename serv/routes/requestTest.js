const express = require('express');
const router = express.Router();
const requestController = require('../controller/testRe/controllerrequest');

// Route to create a new request
router.post('/:userId/:landId', requestController.createRequest);

// Route to update an existing request
router.patch('/update', requestController.updateRequestStatus);

// Route to get all requests for a specific user
router.get('/user/:userId', requestController.getRequestByUser);

module.exports = router;