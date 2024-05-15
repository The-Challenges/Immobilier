const db = require('../../Model/index');
// const dummyLand=require('./Land.json')
const { Op } = require('sequelize');



module.exports = {
    getAllLands: async (req, res) => {
        try {

            const houses = await db.Land.findAll({
                include: [
                    {
                        model: db.Media,
                        attributes: ['type', 'name', 'link']
                    },
                    {
                        model: db.Access // Assuming Access is the model for access related to a land
                    },
                    {
                        model: db.View // Assuming View is the model for views related to a land
                    },
                    {
                        model: db.Comment // Assuming Comment is the model for comments related to a land
                    },
                    {
                       model: db.User ,
                       attributes:['firstName','email','phoneNumber']
                    },


                ]
            });
            res.json(houses)

        } catch (error) {
            res.status(500).json({ error: `Error fetching lands: ${error.message}` });
        }
    },
    
   
    
    createlands : async(req,res)=>{
        try{
            const land = await db.Land.bulkCreate(dummyLand)
            res.status(200).json(land);            }
           catch (error){
              console.log(error);
              console.error(error)
        
           }
    },


    filterLands: async (req, res) => {
        const {
            priceMin,
            priceMax,
            sizeMin,
            sizeMax,
            altMin,
            altMax,
            longMin,
            longMax,
            terrainType,
            zoning,
            purchaseOption,
            isVerified
        } = req.query;
    
        const queryConditions = {
            where: {},  
            include: [
                {
                    model: db.Media,
                    attributes: ['type', 'name', 'link']
                },
                {
                    model: db.View,
                    attributes: ['options']  // corrected to actual column name as previously discussed
                },
            ]
        };
        
        if (priceMin || priceMax) {
            queryConditions.where.price = {};
            if (priceMin) queryConditions.where.price[Op.gte] = Number(priceMin);
            if (priceMax) queryConditions.where.price[Op.lte] = Number(priceMax);
        }
    
        if (sizeMin || sizeMax) {
            queryConditions.where.size = {};
            if (sizeMin) queryConditions.where.size[Op.gte] = parseFloat(sizeMin);
            if (sizeMax) queryConditions.where.size[Op.lte] = parseFloat(sizeMax);
        }
    
        if (altMin || altMax) {
            queryConditions.where.alt = {};
            if (altMin) queryConditions.where.alt[Op.gte] = parseFloat(altMin);
            if (altMax) queryConditions.where.alt[Op.lte] = parseFloat(altMax);
        }
    
        if (longMin || longMax) {
            queryConditions.where.long = {};
            if (longMin) queryConditions.where.long[Op.gte] = parseFloat(longMin);
            if (longMax) queryConditions.where.long[Op.lte] = parseFloat(longMax);
        }
    
        if (terrainType && terrainType !== 'Unknown') {
            queryConditions.where.TerrainType = terrainType;
        }
    
        if (zoning && zoning !== 'Unknown') {
            queryConditions.where.Zoning = zoning;
        }
    
        if (purchaseOption && purchaseOption !== 'Unknown') {
            queryConditions.where.purchaseoption = purchaseOption;
        }
    
        if (isVerified !== undefined) {
            queryConditions.where.isVerifie = isVerified === 'true';
          }
    
        try {
            const filteredLands = await db.Land.findAll(queryConditions);
            res.json(filteredLands);
        } catch (error) {
            console.error(`Error fetching filtered lands: ${error.message}`);
            res.status(500).json({ error: `Error fetching filtered lands: ${error.message}` });
        }
    }
    
};

