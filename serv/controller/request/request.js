const db = require('../../Model/index');

// routes/requests.js
const express = require('express');
const router = express.Router();

// Endpoint to send a request for a house
router.post('/house/request', async (req, res) => {
  const { senderId, receiverId } = req.body;
  
  try {
    // Create a new RequestHouse entry in the database
    const request = await db.RequestHouse.create({ senderId, receiverId });
    // Emit a socket event to the receiver with the request details
    io.to(receiverId).emit('houseRequestReceived', { requestId: request.id, senderId });
    res.status(200).send({ message: 'Request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Endpoint to send a request for a land
router.post('/land/request', async (req, res) => {
  const { senderId, receiverId } = req.body;
  
  try {
    // Create a new RequestLand entry in the database
    const request = await db.RequestLand.create({ senderId, receiverId });
    // Emit a socket event to the receiver with the request details
    io.to(receiverId).emit('landRequestReceived', { requestId: request.id, senderId });
    res.status(200).send({ message: 'Request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.post('/request/:type/accept', async (req, res) => {
  const { requestId, receiverId } = req.body;
  const { type } = req.params;
  
  try {
    let requestModel;
    if (type === 'house') {
      requestModel = db.RequestHouse;
    } else if (type === 'land') {
      requestModel = db.RequestLand;
    } else {
      return res.status(400).send({ error: 'Invalid request type' });
    }
    
    // Find and update the request status to 'accepted'
    const request = await requestModel.findByPk(requestId);
    if (!request) {
      return res.status(404).send({ error: 'Request not found' });
    }
    
    request.status = 'accepted';
    await request.save();
    
    io.to(request.senderId).emit(`${type}RequestAccepted`, { requestId });
    
    res.status(200).send({ message: 'Request accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.post('/request/:type/reject', async (req, res) => {
  const { requestId, receiverId } = req.body;
  const { type } = req.params;
  
  try {
    let requestModel;
    if (type === 'house') {
      requestModel = RequestHouse;
    } else if (type === 'land') {
      requestModel = db.RequestLand;
    } else {
      return res.status(400).send({ error: 'Invalid request type' });
    }
    
    // Find and delete the request
    const request = await requestModel.findByPk(requestId);
    if (!request) {
      return res.status(404).send({ error: 'Request not found' });
    }
    
    await request.destroy();
    
    // Emit a socket event to the sender notifying them that the request is rejected
    io.to(request.senderId).emit(`${type}RequestRejected`, { requestId });
    
    res.status(200).send({ message: 'Request rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;

