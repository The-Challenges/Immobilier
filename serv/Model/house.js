const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    const House = Sequelize.define('House', {
 
        title: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        numberbathrooms: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        
        numberbedrooms: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        garage: {
            type: DataTypes.INTEGER,
            defaultValue: 0
          },
          
          parking: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          },

          isVerified:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
          },

          alt:{
            type: DataTypes.FLOAT 
          },
          
          long:{
            type: DataTypes.FLOAT 
          },
          
          purchaseoption:{
            type: DataTypes.ENUM('Finance','cash','Unknown'),
            defaultValue: "Unknown"
          },
          
          propertyType: {
            type: DataTypes.ENUM('Villa', 'Rural', 'Retirement Living', 'All types'),
            defaultValue: 'All types'
          },
          

          houseAge:{
            type: DataTypes.ENUM('Established', 'New', 'All types'),
            defaultValue: 'All types'
          },
          
          
        });
        House.associate = function(models) {
          House.hasMany(models.Media, {
              foreignKey: 'HouseId',
              as: 'images'
          });
      };
        
        
    return House;
};
