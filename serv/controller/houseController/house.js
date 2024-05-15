const { Sequelize, DataTypes, Op, Model } = require('sequelize');
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
                    model: db.User,
                    attributes: ['firstName', 'email', 'phoneNumber']
                },
                {
                    model: db.View,
                
                },
                // {
                //     model: db.Climat,
                    
                // },
                // {
                //     model: db.Outdoor, 
                // },
                {
                    model:db.Indoor,
                   
                },
               
            
            
            ]
            });
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `error fetching houses: ${error.message}` });
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
            where: {},
            include: [{
                model: db.Media,
                // as: 'images',
                attributes: ['type', 'name', 'link']
            }]
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
            queryConditions.where.isVerified = (isVerified === 'true');
        }
    
        try {
            const filteredHouses = await db.House.findAll(queryConditions);
            res.json(filteredHouses);
        } catch (error) {
            console.error(`error fetching filtered houses: ${error.message}`);
            res.status(500).json({ error: `error fetching filtered houses: ${error.message}` });
        }
    }
    

};
