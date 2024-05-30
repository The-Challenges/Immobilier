const { Model } = require('sequelize');
const db = require('../../Model/index');

// routes/requests.js
const express = require('express');
const users = require('../../Model/users');
const router = express.Router();

module.exports.createRequest=async(req,res)=>{
  try {
    const { userId, estateId ,type} = req.params
    if(type==="land"){
      
      const creotor= await db.RequestLand.create({
        landId:estateId,
        userId:user.id
        
      });
    return   res.status(200).send({ message: 'Request sent successfully' });
       
    }
    if(type==="house"){
      
      const creotor= await db.RequestHouse.create({
        houseId:estateId,
        userId:user.id
        
      });
    return   res.status(201).send({ message: 'Request sent successfully' });
  }
    } catch (error) {
    
  }
}
// all requested sended by the user
module.exports.getAllEstateByBuyer = async (req, res) => {
  try {
    const { userId, type } = req.params;

    if (type === "land") {
      const lands = await db.User.findByPk(userId,{
        
        include: [{
          model: db.Land,
          through: {
            model: db.RequestLand,
            as: 'RequestLand'
            // attributes: ['status', 'date'] // Attributes you want from the join table
          }
          
          // through: { attributes: [] }  // Specify through table attributes if needed
      }]

      });
      return res.status(200).send(lands);
    } else if (type === "house") {
      const houses = await db.User.findByPk(userId,{
        
        include: [{
          model: db.House,
          through: {
            model: db.RequestHouse,
            as: 'RequestHouse'
            // attributes: ['status', 'date'] // Attributes you want from the join table
          }
          // through: { attributes: [] }  // Specify through table attributes if needed
      }]

      });
      return res.status(200).send(houses);
    }
  } catch (error) {
    throw error;
  }
};
// all house or land owned by user
// all house or land owned by user
module.exports.getAllEstateBySeller = async (req, res) => {
  console.log("...........................................")
  try {
    const { userId, type } = req.params;

    if (type === "land") {
      const lands = await db.Land.findAll({
        where: { userId: userId },
        include: [{
            model: db.User,
            as: 'Users', 
            through: {
                model: db.RequestLand,
                attributes: ['status'] 
              }
            },
            {
              model: db.Media, 
            }
          ]
        });
      return res.status(200).send(lands);
    } else if (type === "house") {
      const houses =  await db.House.findAll({
        where: {  userId: userId },
        include: [{
            model: db.User,
            as: 'Users', // This "as" must match the alias used in belongsToMany if any
            through: {
                model: db.RequestHouse,
                as: 'RequestHouse'
                // attributes: ['status', 'date'] // Attributes you want from the join table
              }
            },
            {
              model: db.Media, 
            }
          ]
        });
      return res.status(200).send(houses);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).send({ message: 'Failed to fetch data' });
  }
};



// all requests house or land sended by tge user for a current land or house 
module.exports.getAllRequestByEstateId = async (req, res) => {
  try {
    const { estateId, type } = req.params;

    if (type === "land") {
      const requests = await db.RequestLand.findAll({
        where: { landId: estateId },
        include: [
          {
            model: db.User 
          },
          {
            model: db.Land 
          },
          {
            model: db.Media,
          }
          
        ]
      });
      return res.status(200).send(requests);
    } else {
      const requests = await db.RequestHouse.findAll({
        where: { houseId: estateId },
        include: [
          {
            model: db.User
          },
          {
            model: db.House, 
            include: [
              {
                model: db.User 
              }
            ]
          }
        ]
      });
      return res.status(200).send(requests);
    }
  } catch (error) {
    throw error;
  }
};
module.exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const request = await db.RequestHouse.findByPk(requestId);

    if (!request) {
      return res.status(404).send({ message: 'Request not found' });
    }

    // Update the status
    request.status = status;
    await request.save();

    return res.status(200).send({ message: 'Request status updated successfully' });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).send({ message: 'Failed to update request status' });
  }
};
module.exports.updateLandRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    // Find the request by ID
    const request = await db.RequestLand.findByPk(requestId);

    if (!request) {
      return res.status(404).send({ message: 'Request not found' });
    }

    // Update the status
    request.status = status;
    await request.save();

    return res.status(200).send({ message: 'Land request status updated successfully' });
  } catch (error) {
    console.error('Error updating land request status:', error);
    res.status(500).send({ message: 'Failed to update land request status' });
  }
};