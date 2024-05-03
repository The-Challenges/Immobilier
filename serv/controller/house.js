//  const { Sequelize, DataTypes } = require('sequelize');
const House = require('../Model/house');

module.exports = {
    getAllHouses: async (req, res) => {
        try {
            const houses = await House.findAll();
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },
    
    createHouse: async (req, res) => {
        try {
            // const newHouse = await House.create(req.body);
            // const newHouse = await House.create({
            //   title: req.body.title,
            //   description: req.body.description,
            //   price: req.body.price,
            //   location: req.body.location,
            //   mapLocation: req.body.mapLocation,
            //   picture: req.body.picture,
            //  numberOfRooms: req.body.numberOfRooms,
            //   isVerified: JSON.parse(req.body.isVerified),
            //   Option: req.body.Option
            // });
             const newHouse = await House.create({
              title: 'req.body.title',
              description: 'req.body.description',
              price: 5999,
              location: 'req.body.location',
              mapLocation: 'req.body.mapLocation',
              picture: 'req.body.picture',
             numberOfRooms: 5,
              isVerified: true,
              Option: 'req.body.Option'
            });
            console.log('House created successfully.');
            res.status(201).send(newHouse);
        } catch (error) {
            res.status(500).json({ error: `Error creating house: ${error.message}` });
        }
    }
};
