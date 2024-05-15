const db = require('../../Model/index');

// routes/requests.js
const express = require('express');
const router = express.Router();

module.exports.createRequest = async (req, res) => {
  try {
    const { userId, houseId, type } = req.params;
// console.log(params,'aa');
    // console.log('Estate ID:', estateId);

    // if (!userId || !estateId) {
    //   return res.status(400).send({ error: 'Missing userId or estateId' });
    // }

    if (type === "land") {
      const creator = await db.RequestLand.create({
        landId: houseId,
        userId: userId
      })
      return res.status(200).send({ message: 'Request sent successfully' });
    }

    else if (type === "house") {
      const creator = await db.RequestHouse.create({
        houseId: houseId,
        userId: userId,
      });

      return res.status(201).send({ message: 'Request sent successfully' });
    } else {
      return res.status(400).send({ error: 'Invalid request type specified' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Error in the request', details: error.message });
  }
}


module.exports.getAllEstateByBuyer=async(req,res)=>{
  try {
    console.log(req.params)
    const { userId,type} = req.params
    if(type==="land"){
      console.log('Creating house request with estate ID:', estateId, 'and user ID:', userId);
      const creotor= await db.RequestLand.findAll({
      where:{
        userId:userId,
      
      },
      include:[{
        model:db.House,
        include:{
          model:db.User
        }
    
      }]
        
      });
      return   res.status(200).send(creotor);

    }
    else{
      
      const creotor= await db.User.findAll({
      where:{
        id:userId,
   
      },
      include:[{
        model:db.House,
        include:{
          model:db.User
        }
    
      }]
        
      });
      return   res.status(200).send(creotor);

    }

    } catch (error) {
    throw error
  }
}

// // Endpoint to send a request for a house
// router.post('/house/request', async (req, res) => {
//   const { senderId, receiverId } = req.body;
  
//   try {
//     // Create a new RequestHouse entry in the database
//     const request = await db.RequestHouse.create({ senderId, receiverId });
//     // Emit a socket event to the receiver with the request details
//     io.to(receiverId).emit('houseRequestReceived', { requestId: request.id, senderId });
//     res.status(200).send({ message: 'Request sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal server error' });
//   }
// });

// // Endpoint to send a request for a land
// router.post('/land/request', async (req, res) => {
//   const { senderId, receiverId } = req.body;
  
//   try {
//     // Create a new RequestLand entry in the database
//     const request = await db.RequestLand.create({ senderId, receiverId });
//     // Emit a socket event to the receiver with the request details
//     io.to(receiverId).emit('landRequestReceived', { requestId: request.id, senderId });
//     res.status(200).send({ message: 'Request sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal server error' });
//   }
// });

// router.post('/request/:type/accept', async (req, res) => {
//   const { requestId, receiverId } = req.body;
//   const { type } = req.params;
  
//   try {
//     let requestModel;
//     if (type === 'house') {
//       requestModel = db.RequestHouse;
//     } else if (type === 'land') {
//       requestModel = db.RequestLand;
//     } else {
//       return res.status(400).send({ error: 'Invalid request type' });
//     }
    
//     // Find and update the request status to 'accepted'
//     const request = await requestModel.findByPk(requestId);
//     if (!request) {
//       return res.status(404).send({ error: 'Request not found' });
//     }
    
//     request.status = 'accepted';
//     await request.save();
    
//     io.to(request.senderId).emit(`${type}RequestAccepted`, { requestId });
    
//     res.status(200).send({ message: 'Request accepted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal server error' });
//   }
// });

// router.post('/request/:type/reject', async (req, res) => {
//   const { requestId, receiverId } = req.body;
//   const { type } = req.params;
  
//   try {
//     let requestModel;
//     if (type === 'house') {
//       requestModel = RequestHouse;
//     } else if (type === 'land') {
//       requestModel = db.RequestLand;
//     } else {
//       return res.status(400).send({ error: 'Invalid request type' });
//     }
    
//     // Find and delete the request
//     const request = await requestModel.findByPk(requestId);
//     if (!request) {
//       return res.status(404).send({ error: 'Request not found' });
//     }
    
//     await request.destroy();
    
//     // Emit a socket event to the sender notifying them that the request is rejected
//     io.to(request.senderId).emit(`${type}RequestRejected`, { requestId });
    
//     res.status(200).send({ message: 'Request rejected successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal server error' });
//   }
// });

// module.exports = router;

