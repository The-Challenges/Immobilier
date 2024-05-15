const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    const House = Sequelize.define('House', {
 
        title: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
        },
        numberbathrooms: {
            type: DataTypes.INTEGER,
        },
        
        numberbedrooms: {
            type: DataTypes.INTEGER,
        },
        garage: {
            type: DataTypes.INTEGER,
        },
        parking: {
            type: DataTypes.BOOLEAN,
        },
        alt:{
            type: DataTypes.FLOAT    },
            
            long:{
              type: DataTypes.FLOAT    },
              purchaseoption:{
                type: DataTypes.ENUM('Finance','cash','Unknown'),
              },
              propretyType:{
                type: DataTypes.ENUM('Villa', 'Rural', 'Retirement Living','All types'),
              },
              houseAge:{
                type: DataTypes.ENUM('Established', 'New', 'All types'),
              },
              isVerifie:{
                type: DataTypes.BOOLEAN,
              }

    });

    return House;
}
