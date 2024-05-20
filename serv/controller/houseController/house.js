const { where } = require('sequelize');
const db = require('../../Model/index');
const media = require('../../Model/media');

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
                        model: db.Climate,
                        attributes: ['options'] 
                    },
                    {
                        model: db.Outdoor,
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

    updateHouse: async (req, res) => {
        try {
            const { id } = req.params; // Assuming you pass the house id in the request params
            const {
                title, price, numberBathrooms, numberBedrooms, garage, parking,
                latitude, longitude, purchaseOption, propertyType, houseAge, userId, isVerified,
                indoorOptions, outdoorOptions, climateOptions, view,Media
            } = req.body;

            // Fetch the house by id
            let house = await db.House.findByPk(id);
            if (!house) {
                return res.status(404).json({ error: 'House not found' });
            }

            // Update house properties
            house.title = title;
            house.price = price;
            house.numberBathrooms = numberBathrooms;
            house.numberBedrooms = numberBedrooms;
            house.garage = garage;
            house.parking = parking;
            house.latitude = latitude;
            house.longitude = longitude;
            house.purchaseOption = purchaseOption;
            house.propertyType = propertyType;
            house.houseAge = houseAge;
            house.userId = userId;
            house.isVerified = isVerified;

            // Save the updated house
            await house.save();

            // Delete existing related options
            await db.Indoor.destroy({ where: { HouseId: id } });
            await db.Outdoor.destroy({ where: { HouseId: id } });
            await db.Climat.destroy({ where: { HouseId: id } });
            await db.View.destroy({ where: { HouseId: id } });
            await db.Media.destroy({where: {HouseId:id}});
            // Add new related options
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
            if (Media && Media.length > 0) {
                const Media = Media.map(option => ({ options: option, HouseId: id }));
                await db.Media.bulkCreate(Media);
            }
            res.status(200).json({ message: 'House updated successfully', house });
        } catch (error) {
            console.error('Error updating house:', error);
            res.status(500).json({ error: `Error updating house: ${error.message}` });
        }
    },

    addHouse: async (req, res) => {
        try {
            const {
                title, price, numberBathrooms, numberBedrooms, garage, parking,
                latitude, longitude, purchaseOption, propertyType, houseAge, userId, isVerified,
                indoorOptions, outdoorOptions, climateOptions, view, media
            } = req.body;
    
            const result = await db.sequelize.transaction(async (t) => {
                // Create the house
                const newHouse = await db.House.create({
                    title,
                    price,
                    numberBathrooms,
                    numberBedrooms,
                    garage,
                    parking,
                    latitude,
                    longitude,
                    purchaseOption,
                    propertyType,
                    houseAge,
                    userId,
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
                        type: item.type,
                        name: item.name,
                        link: item.link,
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

    // Additional methods for adding specific options to houses
    addIndoorOptionToHouse,
    addOutdoorOptionToHouse,
    addClimateFeatureToHouse
};

async function addIndoorOptionToHouse(req, res) {
    // Implementation similar to the existing method
}

async function addOutdoorOptionToHouse(req, res) {
    // Implementation similar to the existing method
}

async function addClimateFeatureToHouse(req, res) {
    // Implementation similar to the existing method
}
