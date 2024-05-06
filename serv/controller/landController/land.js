const db = require('../../Model/index');
const dummyLand=require('./Land.json')



module.exports = {
    getAllHouses: async (req, res) => {
        try {
            const houses = await db.Land.findAll();
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },
    
   
    
    insertAllHouses : async(req,res)=>{
        try{
            const land = await db.Land.bulkCreate(dummyLand)
            res.status(200).json(land).send(land,"sucess")
           }
           catch (error){
              console.log(error);
              console.error(error)
        
           }
    }
};

