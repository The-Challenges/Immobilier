const express = require('express');
const cors = require('cors');
const UserRoute = require('./routes/routerUser');
const House= require('./routes/routerHouse')
const app = express();
app.use(cors());
app.use(express.json());
const db = require('./Model/index');

const PORT = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.use('/api/user', UserRoute);
app.use('/api/house',House)

app.listen(PORT, function () {
  console.log("Server is running on port", PORT);
});
