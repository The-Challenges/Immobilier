const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://172.20.10.11:4000',
  methods: ["GET", "POST"]
}))
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_conversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User joined conversation: ${conversationId}`)
    });

    socket.on('chat_message', (data) => {
        const { conversationId, message, senderId } = data;
        // Emit the message to all users in the same conversation
        io.in(conversationId).emit('show_notification', { message, senderId });
        console.log(`Message sent in ${conversationId}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
