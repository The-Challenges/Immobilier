const express = require('express');
const favoriteController = require('../controller/favouriteController/favoritesController'); // Update the path as necessary
const router = express.Router();

// Route to add or remove a favorite
router.post('/favorite/toggle', favoriteController.createFavourite);

// Route to get all favorites for a user by type (house or land)
router.get('/favorites/:userId/:type', favoriteController.getAllFavouriteswithUserId);

module.exports = router;
