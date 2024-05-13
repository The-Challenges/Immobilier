const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./Model/index')

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

const verifyToken = token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

const messageHistory = {};
const usersRooms = {}; 
const allrequests ={}


// Middleware
app.use(cors({
    origin: 'http://172.20.10.11:4000',
    methods: ["GET", "POST"]
}));

app.use((req, res, next) => {
    req.io = io; // Make io accessible in routes
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// Routes
app.use('/api/user', require('./routes/routerUser'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/house',require('./routes/routerHouse'))
app.use('/api/land', require('./routes/routerLand'));
app.use('/api/request', require('./routes/requestRoutes'));
app.use('/api/chat',require('./routes/chatRouter'))
app.use('/api/reqtest',require('./routes/requestTest'))
io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const decoded = await verifyToken(token);
      socket.userId = decoded.userId;  
      next();
    } catch (err) {
      const error = new Error("Authentication error");
      next(error);
    }
  })


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
    console.log('A user connected with ID:', socket.userId);


    socket.on('send_request', async (data) => {
        const { userId, landId } = data;
        const request = await db.RequestLand.create({ userId, landId, status: 'pending' });
        request[allrequests].push({request,landId})
        io.emit('request_sent', request);

    });

    socket.on('respond_to_request', async (data) => {
        const { requestId, status } = data;
        const request = await db.RequestLand.update({ status }, { where: { id: requestId } });
        io.emit('request_updated', { requestId, status });
    });

    socket.on('respond_to_house_request', async (data) => {
        const { requestId, response } = data;
        try {
            const request = await db.RequestHouse.findByPk(requestId);
            if (request.receiverId !== socket.userId) {
                socket.emit('error', { message: 'Unauthorized' });
                return;
            }
            request.status = response;
            await request.save();
            io.to(request.senderId).emit('land_request_response', { requestId, response });
        } catch (error) {
            console.error('Error responding to house request:', error);
            socket.emit('error', { message: 'Failed to respond to house request' });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {io}
