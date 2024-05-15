const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
// require('./faker')()
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

const messageHistory = {};
const usersRooms = {}; 

// Middleware

app.use(cors({
    origin: 'http://192.168.103.18:4000',
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// Routes
app.use('/api/user', require('./routes/routerUser'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/house',require('./routes/routerHouse'))
app.use('/api/land', require('./routes/routerLand'));
app.use('/api/request', require('./routes/requestRoutes'));


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_room', (roomId, userId) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room: ${roomId}`);
        usersRooms[userId] = usersRooms[userId] || [];
        if (!usersRooms[userId].includes(roomId)) {
            usersRooms[userId].push(roomId);
        }
        if (messageHistory[roomId]) {
            socket.emit('message_history', messageHistory[roomId]);
        }
    });

    socket.on('chat_message', (data) => {
        const { roomId, message, senderId } = data;
        messageHistory[roomId] = messageHistory[roomId] || [];
        messageHistory[roomId].push({ message, senderId });
        io.in(roomId).emit('message', { message, senderId });
        console.log(`Message sent in room ${roomId}: ${message}`);
    });

    socket.on('send_land_request', async (data) => {
        const { senderId, receiverId } = data;
        try {
            const request = await db.RequestLand.create({ senderId, receiverId, status: 'pending' });
            io.to(receiverId).emit('land_request_received', { requestId: request.id, senderId });
        } catch (error) {
            console.error('Error sending land request:', error);
            socket.emit('error', { message: 'Failed to send land request' });
        }
    });

    socket.on('send_house_request', async (data) => {
        const { senderId, receiverId } = data;
        try {
            const request = await db.RequestHouse.create({ senderId, receiverId, status: 'pending' });
            io.to(receiverId).emit('house_request_received', { requestId: request.id, senderId });
        } catch (error) {
            console.error('Error sending house request:', error);
            socket.emit('error', { message: 'Failed to send house request' });
        }
    });

    socket.on('respond_to_land_request', async (data) => {
        const { requestId, response, responderId } = data;
        try {
            const request = await db.RequestLand.findByPk(requestId);
            if (!request) {
                socket.emit('error', { message: 'Land request not found' });
                return;
            }
            if (request.receiverId !== responderId) {
                socket.emit('error', { message: 'Unauthorized action' });
                return;
            }
            request.status = response;
            await request.save();
            io.to(request.senderId).emit('land_request_response', { requestId, response });
        } catch (error) {
            console.error('Error responding to land request:', error);
            socket.emit('error', { message: 'Failed to respond to land request' });
        }
    });

    socket.on('respond_to_house_request', async (data) => {
        const { requestId, response, responderId } = data;
        try {
            const request = await db.RequestHouse.findByPk(requestId);
            if (!request) {
                socket.emit('error', { message: 'House request not found' });
                return;
            }
            if (request.receiverId !== responderId) {
                socket.emit('error', { message: 'Unauthorized action' });
                return;
            }
            request.status = response;
            await request.save();
            io.to(request.senderId).emit('house_request_response', { requestId, response });
        } catch (error) {
            console.error('Error responding to house request:', error);
            socket.emit('error', { message: 'Failed to respond to house request' });
        }
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
