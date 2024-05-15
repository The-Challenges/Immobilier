const db = require('../../Model/index');
const dummyLand=require('./Land.json')



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

