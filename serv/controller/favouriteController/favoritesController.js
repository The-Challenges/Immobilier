const { Model } = require('sequelize');
const db = require('../../Model/index');

const express = require('express');
const router = express.Router();

module.exports.createFavourite = async (req, res) => {
    try {
        const { userId, estateId, type } = req.body; // Assuming estateId and type are sent in the body.
        const Model = type === "land" ? db.FavouriteLand : db.FavouriteHouse;
        const primaryKey = type === "land" ? 'landId' : 'houseId';

        const favorite = await Model.findOne({
            where: { [primaryKey]: estateId, userId: userId }
        });

        if (favorite) {
            await Model.destroy({
                where: { [primaryKey]: estateId, userId: userId }
            });
            res.status(200).send({ message: 'Favorite removed successfully' });
        } else {
            await Model.create({
                [primaryKey]: estateId,
                userId: userId
            });
            res.status(201).send({ message: 'Favorite added successfully' });
        }
    } catch (error) {
        console.error('Error managing favorite:', error);
        res.status(500).send({ message: 'Error managing favorite' });
    }
};

module.exports.getAllFavouriteswithUserId = async (req, res) => {
    try {
        const { userId, type } = req.params;
        const Model = type === "land" ? db.Land : db.House;
        const FavoriteModel = type === "land" ? db.FavouriteLand : db.FavouriteHouse;
        const favorites = await Model.findAll({
            include: [
                {
                    model: FavoriteModel,
                    as: 'Favorites',
                    where: { userId: userId },
                    required: true
                },
                {
                    model: db.Media // Include the Media model
                }
            ]
        });
        res.status(200).send(favorites);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).send({ message: 'Failed to fetch data' });
    }
};
