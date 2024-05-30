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
        alt: DataTypes.DECIMAL(9, 6),

        long: DataTypes.DECIMAL(9, 6),

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
              },


          });




          Land.associate = function(models) {

            Land.hasMany(models.ShapeCoordinate, {
                foreignKey: 'LandId',
                as: 'shapeCoordinates'
            });
        };


    return Land;
};