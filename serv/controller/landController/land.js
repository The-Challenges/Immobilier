const db = require('../../Model/index');
const dummyLand=require('./Land.json')



module.exports = {
    getAllLands: async (req, res) => {
        try {
            const houses = await db.Land.findAll({
                include: [{
                    model: db.Media,
                    // as: 'images', 
                    attributes: ['type', 'name', 'link'] 
                }]
            });
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },
    
   
    
    createlands : async(req,res)=>{
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

