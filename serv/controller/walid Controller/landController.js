const db = require('../../Model/index');
// const dummyLand=require('./Land.json')
const { Op } = require('sequelize');



module.exports = {


    
    getAllLands: async (req, res) => {
        try {
            const lands = await db.Land.findAll({
                include: [
                    {
                        model: db.Media,
                        attributes: ['type', 'name', 'link'],
                    },
                    {
                        model: db.View,
                        attributes: ['options'],
                    },
                    {
                        model: db.ShapeCoordinate,
                        as: 'shapeCoordinates', 
                        attributes: ['latitude', 'longitude'],  
                    }
                ],
                
                order: [['createdAt', 'DESC']]

            });
            res.json(lands);
        } catch (error) {
            res.status(500).json({ error: `Error fetching lands: ${error.message}` });
        }
    },



    getAllViews: async (req, res) => {
        try {
            const allViews = await db.View.findAll({
                attributes: ['options']
            });
            res.json(allViews);
        } catch (error) {
            console.error(`Error fetching all views: ${error.message}`);
            res.status(500).json({ error: `Error fetching all views: ${error.message}` });
        }
    },
    
    
   
    
    createlands: async (req, res) => {
        const { title, price, size, alt, long, purchaseoption, TerrainType, Zoning, isVerifie, UserId, Media, Views, shapeCoordinates } = req.body;
    
        try {
          
          const newLand = await db.Land.create({
            title,
            price,
            size,
            alt,
            long,
            purchaseoption,
            TerrainType,
            Zoning,
            isVerifie,
            UserId,
          });
    
          // Create associated media
          if (Media && Media.length > 0) {
            await Promise.all(
              Media.map(async (mediaItem) => {
                await db.Media.create({
                  ...mediaItem,
                  LandId: newLand.id,
                });
              })
            );
          }
    
          // Create associated views
          if (Views && Views.length > 0) {
            await Promise.all(
              Views.map(async (viewItem) => {
                await db.View.create({
                  ...viewItem,
                  LandId: newLand.id,
                });
              })
            );
          }
    
          // Create shape coordinates
          if (shapeCoordinates && shapeCoordinates.length > 0) {
            await Promise.all(
              shapeCoordinates.map(async (coord) => {
                await db.ShapeCoordinate.create({
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                  LandId: newLand.id,
                });
              })
            );
          }
    
          res.status(201).json(newLand);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while creating the land.' });
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
            isVerified,
            view // Added view parameter
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
            queryConditions.where.isVerified = isVerified === 'true';
        }
    
        if (view && view !== 'Unknown') {
            queryConditions.include.push({
                model: db.View,
                where: {
                    options: view
                },
                attributes: []
            });
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