const { Sequelize, DataTypes, Op } = require('sequelize');
const db = require('../../Model/index');

module.exports = {
    getAllHouses: async (req, res) => {
        try {
            const houses = await db.House.findAll();
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },
    
    createHouses: async (req, res) => {
        const newHouses = req.body.houses;
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
            isVerified
        } = req.query;

        const queryConditions = {
            where: {}
        };

        if (priceMin || priceMax) {
            queryConditions.where.price = {};
            if (priceMin) queryConditions.where.price[Op.gte] = priceMin;
            if (priceMax) queryConditions.where.price[Op.lte] = priceMax;
        }

        if (areaMin || areaMax) {
            queryConditions.where.area = {};
            if (areaMin) queryConditions.where.area[Op.gte] = areaMin;
            if (areaMax) queryConditions.where.area[Op.lte] = areaMax;
        }

        if (bedrooms) queryConditions.where.numberbedrooms = bedrooms;
        if (bathrooms) queryConditions.where.numberbathrooms = bathrooms
        if (purchaseOption) queryConditions.where.purchaseoption = purchaseOption
        if (propertyType) queryConditions.where.propretyType = propertyType;
        if (houseAge) queryConditions.where.houseAge = houseAge;
if (hasGarage !== undefined) {
    const garageFlag = hasGarage === 'true';
    queryConditions.where.garage = garageFlag ? { [Op.gt]: 0 } : 0;
}
        if (hasParking !== undefined) queryConditions.where.parking = hasParking;
        if (isVerified !== undefined) queryConditions.where.isVerifie = isVerified

        try {
            const filteredHouses = await db.House.findAll(queryConditions);
            res.json(filteredHouses);
        } catch (error) {
            console.error(`error fetching filtered houses: ${error.message}`);
            res.status(500).json({ error: `error fetching filtered houses: ${error.message}` });
        }
    }
};
