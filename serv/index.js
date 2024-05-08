const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
//require('./faker')()
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

const messageHistory = {};
const usersRooms = {}; // To store rooms associated with each user

// Middleware
app.use(cors({
    origin: 'http://172.20.10.11:4000',
    methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// Routes
app.use('/api/user', require('./routes/routerUser'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/house',require('./routes/routerHouse'))
app.use('/api/land', require('./routes/routerLand'))


io.on('connection', (socket) => {
    // console.log('A user connected');

    socket.on('join_room', (roomId, userId) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room: ${roomId}`);

        // Add the room to the list of rooms for this user
        usersRooms[userId] = usersRooms[userId] || [];
        if (!usersRooms[userId].includes(roomId)) {
            usersRooms[userId].push(roomId);
        }

        // If message history exists for the room, send it to the user
        if (messageHistory[roomId]) {
            socket.emit('message_history', messageHistory[roomId]);
        }
    });

    socket.on('chat_message', (data) => {
        const { roomId, message, senderId } = data;
        // Store the message in the message history for the room
        if (!messageHistory[roomId]) {
            messageHistory[roomId] = [];
        }
        messageHistory[roomId].push({ message, senderId });
        // Emit the message to all users in the same room
        io.in(roomId).emit('message', { message, senderId });
        console.log(`Message sent in room ${roomId}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
