const { Sequelize, DataTypes, Op } = require('sequelize');
const db = require('../../Model/index');

module.exports = {

    // getNearbyHouses: async (req, res) => {
    //     const { latitude, longitude } = req.query;
    //     console.log('Received Latitude:', latitude);
    //     console.log('Received Longitude:', longitude);
      
    //     if (!latitude || !longitude) {
    //       return res.status(400).json({ error: 'Latitude and longitude are required' });
    //     }
      
    //     try {
    //       const houses = await db.House.findAll({
    //         where: {
    //           alt: {
    //             [Op.between]: [parseFloat(latitude) - 0.1, parseFloat(latitude) + 0.1],
    //           },
    //           long: {
    //             [Op.between]: [parseFloat(longitude) - 0.1, parseFloat(longitude) + 0.1],
    //           },
    //         },
    //       });
    //       res.json(houses);
    //     } catch (error) {
    //       console.error('Error fetching nearby houses:', error);
    //       res.status(500).json({ error: 'Error fetching nearby houses' });
    //     }
    //   },
    

    getAllHouses: async (req, res) => {
        try {
            const houses = await db.House.findAll({
                include: [
                    {
                        model: db.Media,
                        attributes: ['type', 'name', 'link']
                    },
                    {
                        model: db.Indoor,
                        attributes: ['options']
                    },
                    {
                        model: db.Climate,
                        attributes: ['options']
                    },
                    {
                        model: db.Outdoor,
                        attributes: ['options']
                    },
                    {
                        model: db.View,
                        attributes: ['options']
                    }
                ],
            });
                    
            // console.log(houses);
    
        } catch (error) {
            res.status(500).json({ error: `error fetching houses: ${error.message}` });
        }
    },
    


     getHouseCoordinates : async (req, res) => {
        try {
            const coordinates = await db.House.findAll({
                attributes: ['alt', 'long'], // Assuming 'alt' and 'long' are the fields for latitude and longitude
                where: {} // Add conditions if necessary
            });
            res.json(coordinates);
        } catch (error) {
            console.error(`Error fetching house coordinates: ${error.message}`);
            res.status(500).json({ error: `Error fetching house coordinates: ${error.message}` });
        }
    },
    
    
    
    
    createHouses: async (req, res) => {
        const newHouses = req.body.houses;
        if (!Array.isArray(newHouses) || newHouses.length === 0) {
            return res.status(400).json({
                error: "Invalid input: Expected an array of houses."
            });
        }
    
        try {
            const createdHouses = await db.House.bulkCreate(newHouses, {
                validate: true,
                individualHooks: true
            });
            res.status(201).json({
                message: "Houses created successfully",
                data: createdHouses
            });
        } catch (error) {
            console.error(`Error creating houses: ${error.message}`);
            res.status(500).json({
                error: `Error creating houses: ${error.message}`
            });
        }
    },


    getAllIndoorOptions: async (req, res) => {
        try {
          const indoorOptions = await db.Indoor.findAll({
            attributes: ['options'],
            group: ['options']
          });
          res.json(indoorOptions);
        } catch (error) {
          console.error(`Error fetching indoor options: ${error.message}`);
          res.status(500).json({ error: `Error fetching indoor options: ${error.message}` });
        }
      },
    
      getAllOutdoorOptions: async (req, res) => {
        try {
          const OutdoorOptions = await db.Outdoor.findAll({
            attributes: ['options'],
            group: ['options']
          });
          res.json(OutdoorOptions);
        } catch (error) {
          console.error(`Error fetching Outdoor options: ${error.message}`);
          res.status(500).json({ error: `Error fetching Outdoor options: ${error.message}` });
        }
      },
    
      
    
    


      filterHouses: async (req, res) => {
        const {
            priceMin,
            priceMax,
            areaMin,
            areaMax,
            bedrooms,
            bathrooms,
            purchaseOption,
            propertyType,
            houseAge,
            hasGarage,
            hasParking,
            isVerified,
            indoorOptions,
            outdoorOptions,
            climateOptions
        } = req.query;
    
        const queryConditions = {
            where: {},
            include: [
                {
                    model: db.Media,
                    attributes: ['type', 'name', 'link']
                },
                {
                    model: db.Indoor,
                    attributes: ['options'],
                    required: false
                },
                {
                    model: db.Outdoor,
                    attributes: ['options'],
                    required: false
                },
                {
                    model: db.Climate,
                    attributes: ['options'],
                    required: false
                }
            ]
        };
    
        if (priceMin || priceMax) {
            queryConditions.where.price = {};
            if (priceMin) queryConditions.where.price[Op.gte] = priceMin;
            if (priceMax) queryConditions.where.price[Op.lte] = priceMax;
        }
    
        if (areaMin || areaMax) {
            if (areaMin) {
                queryConditions.where.alt = queryConditions.where.alt || {};
                queryConditions.where.alt[Op.gte] = parseFloat(areaMin);
            }
            if (areaMax) {
                queryConditions.where.long = queryConditions.where.long || {};
                queryConditions.where.long[Op.lte] = parseFloat(areaMax);
            }
        }
    
        if (bedrooms) queryConditions.where.numberbedrooms = bedrooms;
        if (bathrooms) queryConditions.where.numberbathrooms = bathrooms;
        if (purchaseOption) queryConditions.where.purchaseoption = purchaseOption;
        if (propertyType) queryConditions.where.propertyType = propertyType;
        if (houseAge) queryConditions.where.houseAge = houseAge;
    
        if (hasGarage !== undefined) {
            const garageFlag = hasGarage === 'true';
            queryConditions.where.garage = garageFlag ? { [Op.gt]: 0 } : 0;
        }
    
        if (hasParking !== undefined) {
            queryConditions.where.parking = (hasParking === 'true');
        }
    
        if (isVerified !== undefined) {
            const verifiedFlag = isVerified === 'true';
            queryConditions.where.isVerified = verifiedFlag ? 1 : 0;
        }
    
        if (indoorOptions) {
            queryConditions.include.push({
                model: db.Indoor,
                where: {
                    options: {
                        [Op.in]: indoorOptions.split(',')
                    }
                },
                required: true
            });
        }
    
        if (outdoorOptions) {
            queryConditions.include.push({
                model: db.Outdoor,
                where: {
                    options: {
                        [Op.in]: outdoorOptions.split(',')
                    }
                },
                required: true
            });
        }
    
        if (climateOptions) {
            queryConditions.include.push({
                model: db.Climate,
                where: {
                    options: {
                        [Op.in]: climateOptions.split(',')
                    }
                },
                required: true
            });
        }
    
        console.log('Query Conditions:', JSON.stringify(queryConditions, null, 2));
    
        try {
            const filteredHouses = await db.House.findAll(queryConditions);
            console.log('Filtered Houses:', filteredHouses);
            res.json(filteredHouses);
        } catch (error) {
            console.error(`Error fetching filtered houses: ${error.message}`);
            res.status(500).json({ error: `Error fetching filtered houses: ${error.message}` });
        }
    }
    
};

    

