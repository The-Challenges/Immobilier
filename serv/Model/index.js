const { Sequelize, DataTypes } = require('sequelize');
const mysql2 = require('mysql2');

const connection = new Sequelize("immobilier", "root", "Baha1998@", {
  dialect: 'mysql',
  host: 'localhost',
})

async function connectionTest() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


// connection.sync()
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to synchronize database:', error);
//   });


connectionTest();

const db = {};
db.User = require('./users')(connection, DataTypes);

module.exports = db;
