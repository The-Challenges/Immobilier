const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
// const {Chat}=require('./Model')

const PORT = 4002;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room',async (room, userId, userName) => {
    socket.join(room);
    console.log(`User ${userName} (${userId}) joined room: ${room}`);

    // try {
    //   const messages = await Chat.findAll({
    //     where: { conversationId: room },
    //     order: [['time', 'ASC']],
    //   });
      // socket.emit('message_history', messages);
    // } catch (error) {
    //   console.error('Failed to fetch message history:', error);
    // }
    io.to(room).emit('user_joined', { userId, userName });
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on('send_message', (message) => {
    const { room, content, sender, timestamp } = message;
    io.to(room).emit('receive_message', { content, sender, timestamp });
    console.log(`Message sent to room ${room}: ${content}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});