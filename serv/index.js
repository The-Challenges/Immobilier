const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./Model/index')
const {API_AD}=require('./config')

require('dotenv').config();
// require('./faker')()
 
const app = express();
app.use(express.json())

app.use(cors({
    origin: `${API_AD}`,
    methods: ["GET", "POST"]
}));



app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/../client/dist'));
    
    // Routes
app.use('/api/user', require('./routes/routerUser'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/house', require('./routes/routerHouse'))
app.use('/api/land', require('./routes/routerLand'));
app.use('/api/request', require('./routes/requestRoutes'));
app.use('/api', require('./routes/favoritesRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));



app.use('/api/reqtest',require('./routes/requestTest'))
app.use('/api/chat',require('./routes/chatRouter'))



const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    })
    
    
  