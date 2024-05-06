//  const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../Model/index');
const dummyHouses=require('./Houses.json')
module.exports = {
    getAllHouses: async (req, res) => {
        try {
            const houses = await db.House.findAll();
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },
    
   
    
    insertAllHouses : async(req,res)=>{
        try{
            const house = await db.House.bulkCreate(dummyHouses)
            res.status(200).json(house).send(house,"sucess")
           }
           catch (error){
              console.log(error);
              console.error(error)
        
           }
    }
};
