const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    const Land = Sequelize.define('Land', {
 
        title: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        size:{
          type: DataTypes.FLOAT,
        },
        alt:{
            type: DataTypes.FLOAT    },
            
            long:{
              type: DataTypes.FLOAT    },
              purchaseoption:{
                type: DataTypes.ENUM('Finance','cash','Unknown'),
                defaultValue: "Unknown"
              },
              TerrainType:{
                type: DataTypes.ENUM('Flat', 'Sloping', 'hilly', 'forested','Unknown'),
                defaultValue: 'Unknown'
              },
              Zoning:{
                type: DataTypes.ENUM('residential', 'commercial', 'agricultural', 'industrial', 'mixed-use','Unknown'),
                defaultValue: 'Unknown'
              },
             
             
              isVerifie:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
              }

    });

    return Land;
};
