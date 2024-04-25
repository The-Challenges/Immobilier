const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/user');

router.get('/all', usercontroller.getAll);

module.exports = router;
