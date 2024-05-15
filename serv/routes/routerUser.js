const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController/UserController'); // Use consistent naming

router.get('/all', UserController.getAllUsers); // Use UserController instead of usercontroller
router.post('/postMany', UserController.insertAllUsers); // Use UserController instead of usercontroller
router.put('/:id', UserController.updateUser);

module.exports = router;
