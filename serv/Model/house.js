const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const House = sequelize.define('House', {
        title: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        alt: DataTypes.DECIMAL(9, 6),
        long: DataTypes.DECIMAL(9, 6),
        purchaseOption: {
            type: DataTypes.ENUM('Finance', 'cash', 'Unknown'),
            defaultValue: "Unknown"
        },
        propertyType: {
            type: DataTypes.ENUM('Villa', 'Rural', 'Retirement Living', 'All types'),
            defaultValue: 'All types'
        },
        houseAge: {
            type: DataTypes.ENUM('Established', 'New', 'All types'),
            defaultValue: 'All types'
        },
        // userId: { // Add userId field
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'Users', // Name of the Users table
        //         key: 'id'
        //     }
        // }

    });

    House.associate = function(models) {
        House.hasMany(models.Indoor, { foreignKey: 'HouseId', as: 'indoorOptions' });
        House.hasMany(models.Outdoor, { foreignKey: 'HouseId', as: 'outdoorOptions' });
        House.hasMany(models.Climate, { foreignKey: 'HouseId', as: 'climateOptions' });
        House.hasMany(models.View, { foreignKey: 'HouseId', as: 'viewOptions' });
        House.hasMany(models.Media, { foreignKey: 'HouseId', as: 'media' });
        House.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    };

    return House;
};
