const db = require('../Model/index');

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await db.User.findAll();
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  },
  updateProfile:async(req,res)=>{
      try {
        const id=req.params.id
        const user = await db.User.update(req.body,{where:{id:id}})
        res.json(user)
      }
      catch(error){
        console.log(error)
      }
    
    }


};
// module.exports = {
// updateProfile:async(req,res)=>{
//   try {
//     const id=req.params.id
//     const user = await db.User.update(req.body,{where:{id:id}})
//     res.json(user)
//   }
//   catch(error){
//     console.log(error)
//   }

// }
// }
