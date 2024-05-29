const { where } = require('sequelize');
const db = require('../../Model/index');

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
                ]
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
    }
};
