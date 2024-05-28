module.exports = (sequelize, DataTypes) => {
    const ShapeCoordinate = sequelize.define('ShapeCoordinate', {

    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6), 
      allowNull: false,
    },
    });

    ShapeCoordinate.associate = function(models) {
        ShapeCoordinate.belongsTo(models.Land, {
            foreignKey: 'LandId',
            as: 'land'
        });
    };

    return ShapeCoordinate;
};
