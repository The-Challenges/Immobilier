const { where } = require('sequelize');
const db = require('../../Model/index');
 const { Sequelize, DataTypes, Op } = require('sequelize');


module.exports = {
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
                        model: db.User,
                        attributes: ['firstName', 'email', 'phoneNumber']
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
                        order: [['createdAt', 'DESC']]
            });
            res.json(houses);
        } catch (error) {
            console.error('Error fetching houses:', error);
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },

    insertAllHouses: async (req, res) => {
        try {
            const houses = await db.House.bulkCreate(req.body.dummyHouses);
            res.status(200).json({ message: 'Houses inserted successfully', houses });
        } catch (error) {
            console.error('Error inserting houses:', error);
            res.status(500).json({ error: `Error inserting houses: ${error.message}` });
        }
    },

    addHouse: async (req, res) => {
        try {
            const {
                title, price, numberbathrooms, numberbedrooms, garage, parking,
                alt, long, purchaseOption, propertyType, houseAge, isVerified,
                indoorOptions, outdoorOptions, climateOptions, view, media, userId
            } = req.body;

            console.log('Data received by backend:', JSON.stringify(req.body, null, 2));

            const result = await db.sequelize.transaction(async (t) => {
                // Create the house
                const newHouse = await db.House.create({
                    title,
                    price,
                    numberbathrooms,
                    numberbedrooms,
                    garage,
                    parking,
                    alt,
                    long,
                    purchaseOption,
                    propertyType,
                    houseAge,
                    userId, // Include userId here
                    isVerified
                }, { transaction: t });

                // Additional data relations
                if (indoorOptions && indoorOptions.length > 0) {
                    const indoors = indoorOptions.map(option => ({ options: option, HouseId: newHouse.id }));
                    await db.Indoor.bulkCreate(indoors, { transaction: t });
                }
                if (view && view.length > 0) {
                    const views = view.map(option => ({ options: option, HouseId: newHouse.id }));
                    await db.View.bulkCreate(views, { transaction: t });
                }
                if (outdoorOptions && outdoorOptions.length > 0) {
                    const outdoors = outdoorOptions.map(option => ({ options: option, HouseId: newHouse.id }));
                    await db.Outdoor.bulkCreate(outdoors, { transaction: t });
                }
                if (climateOptions && climateOptions.length > 0) {
                    const climates = climateOptions.map(option => ({ options: option, HouseId: newHouse.id }));
                    await db.Climate.bulkCreate(climates, { transaction: t });
                }

                // Create media associated with the house
                if (media && media.length > 0) {
                    const mediaItems = media.map(item => ({
                        type: "jpg",
                        name: "photo",
                        link: item,
                        HouseId: newHouse.id
                    }));
                    await db.Media.bulkCreate(mediaItems, { transaction: t });
                }

                return newHouse;
            });

            res.status(201).json({ message: 'House added successfully', house: result });
        } catch (error) {
            console.error('Error adding house:', error);
            res.status(500).json({ error: `Error adding house: ${error.message}` });
        }
    },
    
    getHousesByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const houses = await db.House.findAll({
                where: { userId },
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
                ]
            });
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },
    getHouseById: async (req, res) => {
        const { id } = req.params;
        try {
            const house = await db.House.findByPk(id);
            if (house) {
                res.status(200).json(house);
            } else {
                res.status(404).json({ error: 'House not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch house' });
        }
    },

    
    updateHouse: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                title, price, numberbathrooms, numberbedrooms, garage, parking,
                alt, long, purchaseOption, propertyType, houseAge, userId, isVerified,
                indoorOptions, outdoorOptions, climateOptions, view, media
            } = req.body;

            let house = await db.House.findByPk(id);
            if (!house) {
                return res.status(404).json({ error: 'House not found' });
            }

            house.title = title;
            house.price = price;
            house.numberbathrooms = numberbathrooms;
            house.numberbedrooms = numberbedrooms;
            house.garage = garage;
            house.parking = parking;
            house.alt = alt;
            house.long = long;
            house.purchaseOption = purchaseOption;
            house.propertyType = propertyType;
            house.houseAge = houseAge;
            house.userId = userId;
            house.isVerified = isVerified;

            await house.save();

            await db.Indoor.destroy({ where: { HouseId: id } });
            await db.Outdoor.destroy({ where: { HouseId: id } });
            await db.Climate.destroy({ where: { HouseId: id } });
            await db.View.destroy({ where: { HouseId: id } });
            await db.Media.destroy({ where: { HouseId: id } });

            if (indoorOptions && indoorOptions.length > 0) {
                const indoors = indoorOptions.map(option => ({ options: option, HouseId: id }));
                await db.Indoor.bulkCreate(indoors);
            }
            if (view && view.length > 0) {
                const views = view.map(option => ({ options: option, HouseId: id }));
                await db.View.bulkCreate(views);
            }
            if (outdoorOptions && outdoorOptions.length > 0) {
                const outdoors = outdoorOptions.map(option => ({ options: option, HouseId: id }));
                await db.Outdoor.bulkCreate(outdoors);
            }
            if (climateOptions && climateOptions.length > 0) {
                const climates = climateOptions.map(option => ({ options: option, HouseId: id }));
                await db.Climate.bulkCreate(climates);
            }
            if (media && media.length > 0) {
                const mediaItems = media.map(item => ({
                    type: "jpg",
                    name: "photo",
                    link: item,
                    HouseId: id
                }));
                await db.Media.bulkCreate(mediaItems);
            }
            res.status(200).json({ message: 'House updated successfully', house });
        } catch (error) {
            console.error('Error updating house:', error);
            res.status(500).json({ error: `Error updating house: ${error.message}` });
        }
    },

    addIndoorOptionToHouse: async (req, res) => {
        // Implementation similar to the existing method
    },

    addOutdoorOptionToHouse: async (req, res) => {
        // Implementation similar to the existing method
    },

    addClimateFeatureToHouse: async (req, res) => {
        // Implementation similar to the existing method
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
    
      
    
    
    //   createHouses: async (req, res) => {
    //     const newHouses = req.body.houses;
    //     if (!Array.isArray(newHouses) || newHouses.length === 0) {
    //         return res.status(400).json({
    //             error: "Invalid input: Expected an array of houses."
    //         });
    //     }
    
    //     try {
    //         const createdHouses = await db.House.bulkCreate(newHouses, {
    //             validate: true,
    //             individualHooks: true
    //         });
    //         res.status(201).json({
    //             message: "Houses created successfully",
    //             data: createdHouses
    //         });
    //     } catch (error) {
    //         console.error(`Error creating houses: ${error.message}`);
    //         res.status(500).json({
    //             error: `Error creating houses: ${error.message}`
    //         });
    //     }
    // },


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
            
            if (filteredHouses.length === 0) {
                return res.status(404).json({ error: "House not found" });
            }
            
            res.json(filteredHouses);
        } catch (error) {
            console.error(`Error fetching filtered houses: ${error.message}`);
            res.status(500).json({ error: `Error fetching filtered houses: ${error.message}` });
        }
    }
};
