const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController/UserController'); 

router.get('/all', UserController.getAllUsers);
router.post('/postMany', UserController.insertAllUsers); 
router.put('/:id', UserController.updateUser);
router.get('/:id', UserController.getUser);
module.exports = router;
