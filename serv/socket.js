const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// const userSockets = {};
// const connectedUsers = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // const userId = socket.handshake.query.userId;
  // if (userId) {
  //   console.log(`User ID: ${userId}`);
  //   userSockets[userId] = socket.id;
  //   connectedUsers[userId] = true;

  //   socket.join('global');
  // }

  // socket.on('send_message', (data, callback) => {
    // console.log(socket.userId)
    // console.log('A user connected');
    // console.log('A user connected with ID:', socket.id);
    // socket.on('join_room', (roomId, userId) => {
    //     socket.join(roomId);
    //     console.log(`User ${userId} joined room: ${roomId}`);
    //     usersRooms[userId] = usersRooms[userId] || [];
    //     if (!usersRooms[userId].includes(roomId)) {
    //         usersRooms[userId].push(roomId);
    //     }
    //     if (messageHistory[roomId]) {
    //         socket.emit('message_history', messageHistory[roomId]);
    //     }
    // });

    // socket.on('chat_message', (data) => {
    //     const { roomId, message, senderId } = data;
    //     messageHistory[roomId] = messageHistory[roomId] || [];
    //     messageHistory[roomId].push({ message, senderId });
    //     io.in(roomId).emit('message', { message, senderId });
    //     console.log(`Message sent in room ${roomId}: ${message}`);
    // });
    // console.log('A user connected with ID:', socket.userId);
    socket.on('receiver', (ownerId) => {
      socket.join(ownerId);
      console.log(`User joined room: ${ownerId}`);
    });

    socket.on('send_land_request', async (data) => {
        
        const { land} = data
    console.log("data land is received for the user ",data)
        socket.to(land.UserId).emit('requestLandCreated', {...data}); 
     
    });
    socket.on('send_house_request', async (data) => {
        
        const {house } = req.params
        console.log("data land is received for the user ",data)
        io.to(house.UserId).emit('requestHouseCreated', {...data}); 
});
//     socket.on('respond_to_request', async (data) => {
//         const { requestId, status } = data; 
//         try {
//             const request = await db.RequestLand.update({ status }, {
//                 where: { id: requestId }
//             });
//             const updatedRequest = await db.RequestLand.findByPk(requestId);
//             io.to(updatedRequest.userId).emit('request_response', updatedRequest); 
//         } catch (error) {
//             socket.emit('error', { message: "Failed to update request" });
//         }
//     });

//     socket.on('respond_to_house_request', async (data) => {
//         const { requestId, response } = data;
//         try {
//             const request = await db.RequestHouse.findByPk(requestId);
//             if (request.receiverId !== socket.userId) {
//                 socket.emit('error', { message: 'Unauthorized' });
//                 return;
//             }
//             request.status = response;
//             await request.save();
//             io.to(request.senderId).emit('land_request_response', { requestId, response });
//         } catch (error) {
//             console.error('Error responding to house request:', error);
//             socket.emit('error', { message: 'Failed to respond to house request' });
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
});





server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})