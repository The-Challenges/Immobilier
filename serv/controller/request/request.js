const { Model } = require('sequelize');
const db = require('../../Model/index');

// routes/requests.js
const express = require('express');
const users = require('../../Model/users');
const router = express.Router();

module.exports.createRequset=async(req,res)=>{
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
      const creator = await db.User.findAll({
        where: {
          id: userId,
        },
        include: [
          {
            model: db.Land,
            include: [
              {
                model: db.User
              },
              {
                model: db.Media
              }
            ]
          }
        ]
      });
      return res.status(200).send(creator);
    } else {
      const creator = await db.User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: db.House,
            include: [
              {
                model: db.User
              },
              {
                model: db.Media 
              }
            ]
          }
        ]
      });
      return res.status(200).send(creator);
    }
  } catch (error) {
    throw error;
  }
};
// all house or land owned by user
module.exports.getAllEstateBySeller = async (req, res) => {
  try {
    const { userId, type } = req.params;

    if (type === "land") {
      const creator = await db.Land.findOne({
        where: {
          userId: userId,
        },
        include:[
          {
            model: db.User
          },
          {
            model: db.Media
          }
        ]
        // include: [
        //   {
        //     model: db.RequestLand,
         
        //   }
        // ]
      });
      return res.status(200).send(creator);
    } else {
      const creator = await db.House.findAll({
        where: {
          userId: userId,
        },
        include:[
          {
            model: db.User
          },
          {
            model: db.Media
          }
        // include: [
        //   {
        //     model: db.RequestHouse,
         
        //   }
        ]
      });
      return res.status(200).send(creator);
    }
  } catch (error) {
    throw error;
  }
};
// all requests house or land sended by tge user for a current land or house 
module.exports.getAllRequestByEstateId = async (req, res) => {
  try {
    const { estateId, type } = req.params;

    if (type === "land") {
      const creator = await db.RequestLand.findAll({
        where: { landId: estateId },
        include: [
          {
            model: db.User, // Include details about the users who made the request
         
          },
   
        ]
      });
      return res.status(200).send(creator);
    } else {
      const creator = await db.RequestHouse.findAll({
        where: { houseId: estateId },
        include: [
          {
            model: db.User, // Include details about the users who made the request
         
          },
   
        ]
      });
      return res.status(200).send(creator);
    }
  } catch (error) {
    throw error;
  }
};