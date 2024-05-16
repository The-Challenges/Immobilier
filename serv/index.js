const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./Model/index')

require('dotenv').config();
// require('./faker')()

const app = express();

// faker()

// const verifyToken = token => {
//     return new Promise((resolve, reject) => {
//       jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(decoded);
//         }
//       });
//     });
//   };

// Middleware

app.use(cors({
    origin: 'http://192.168.11.50:4000',
    methods: ["GET", "POST"]
}));

// app.use((req, res, next) => {
//     req.io = io; 
//     next();
// })


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

// app.use('/api/reqtest',require('./routes/requestTest'))
// io.use(async (socket, next) => {
//     try {
//       const token = socket.handshake.query.token;
//       const decoded = await verifyToken(token);
//       socket.userId = decoded.userId;  

//       next();
//     } catch (err) {
//       const error = new Error("Authentication error");
//       next(error);
//     }
//   })


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})