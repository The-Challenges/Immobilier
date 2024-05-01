
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    const Land = Sequelize.define('Land', {
        landId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        location: DataTypes.STRING,
        mapLocation: DataTypes.STRING,
        isVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        Option: {
            type: DataTypes.STRING ,
           
          }
      });
      
      return Land      
    }
