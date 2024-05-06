const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/userController/UserController');


router.put('/id', usercontroller.updateProfile)
router.get('/all', usercontroller.getAllUsers);
router.post('/postMany',usercontroller.insertAllUsers)

module.exports = router;
