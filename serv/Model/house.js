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

        purchaseoption: {
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
        }
    });


    return House;

};