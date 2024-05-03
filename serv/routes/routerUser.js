const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/user');

router.get('/all', usercontroller.getAll);
router.put('/id', usercontroller.updateProfile)

module.exports = router;
