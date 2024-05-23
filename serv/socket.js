// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const axios = require('axios');
// const {API_AD}=require('./config')
// const PORT = 4001;

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//   },
// });

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on('receiver', (ownerId) => {
//     socket.join(ownerId);
//     console.log(`User joined room: ${ownerId}`);
//   });

//   socket.on('send_land_request', async (data) => {
//     const { land } = data;
//     console.log("Land request received:", data);
//     socket.to(land.UserId).emit('requestLandCreated', { ...data });
//   });

//   socket.on('send_house_request', async (data) => {
//     const { house } = data;
//     console.log("House request received:", data);
//     socket.to(house.UserId).emit('requestHouseCreated', { ...data });
//   });

//   socket.on('respond_to_request_house', async (data) => {
//     const { house, status } = data;
    
//     socket.to(house.UserId).emit('request_response_house', data);
// try {
//   await axios.put(`${API_AD}/api/reqtest/update-house-request/${house.UserId}/${house.id}`, { status });
  
//   console.log("House request response:", data);
// } catch (error) {
//   console.log(error);
// }
//   });

//   socket.on('respond_to_request_land', async (data) => {
//     const { land, status } = data;
//     try {
//       await axios.put(`${API_AD}/api/reqtest/update-land-request/${land.UserId}/${land.id}`, { status });
//       console.log("Land request response:", data);
//       socket.to(land.UserId).emit('request_response_land', data);
//     } catch (error) {
//       console.error("Error updating land request:", error);
//     }
//   });

//   socket.on('accept_request', (data) => {
//     const { userId, requestType } = data;
//     console.log(`Request accepted: ${requestType} for user: ${userId}`);
//     socket.to(userId).emit('request_accepted', { requestType });
//   });

//   socket.on('refuse_request', (data) => {
//     const { userId, requestType } = data;
//     console.log(`Request refused: ${requestType} for user: ${userId}`);
//     socket.to(userId).emit('request_refused', { requestType });
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
// const {Chat}=require('./Model')

const PORT = 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // socket.on('join_room',async (room, userId, userName) => {
  //   socket.join(room);
  //   console.log(`User ${userName} (${userId}) joined room: ${room}`);

  //   // try {
  //   //   const messages = await Chat.findAll({
  //   //     where: { conversationId: room },
  //   //     order: [['time', 'ASC']],
  //   //   });
  //     // socket.emit('message_history', messages);
  //   // } catch (error) {
  //   //   console.error('Failed to fetch message history:', error);
  //   // }
  //   io.to(room).emit('user_joined', { userId, userName });
  // });

  // socket.on('leave_room', (room) => {
  //   socket.leave(room);
  //   console.log(`User left room: ${room}`);
  // });

  // socket.on('send_message', (message) => {
  //   const { room, content, sender, timestamp } = message;
  //   io.to(room).emit('receive_message', { content, sender, timestamp });
  //   console.log(`Message sent to room ${room}: ${content}`);
  // });

  socket.on('receiver', (ownerId) => {
    socket.join(ownerId);
    console.log(`User joined room: ${ownerId}`);
  });

  socket.on('send_land_request', async (data) => {
    const { land } = data;
    console.log("Land request received:", data);
    socket.to(land.UserId).emit('requestLandCreated', { ...data });
  });

  socket.on('send_house_request', async (data) => {
    const { house } = data;
    console.log("House request received:", data);
    socket.to(house.UserId).emit('requestHouseCreated', { ...data });
  });

  socket.on('respond_to_request_house', async (data) => {
    const { house, status } = data;
    console.log(`Sending request to update house request: UserId=${house.UserId}, id=${data.id}, status=${status}`);
    console.log("House request response:", data);
    io.to(data.user.userId).emit('request_response_house', data);
  });

  socket.on('respond_to_request_land', async (data) => {
    const { land, status } = data;
    console.log(`Sending request to update land request: UserId=${land.UserId}, id=${data.id}, status=${status}`);
    console.log("Land request response:", data);
    io.to(data.user.userId).emit('request_response_land', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});