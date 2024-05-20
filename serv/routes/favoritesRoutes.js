const express = require('express');
const favoriteController = require('../controller/favouriteController/favoritesController'); // Update the path as necessary
const router = express.Router();

router.post('/favorite/toggle', favoriteController.createFavourite);

router.get('/favorites/:userId/:type', favoriteController.getAllFavouriteswithUserId);

module.exports = router;
