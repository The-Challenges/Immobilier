const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/userController/UserController');



router.get('/all', usercontroller.getAllUsers);
router.post('/postMany',usercontroller.insertAllUsers)

module.exports = router;
