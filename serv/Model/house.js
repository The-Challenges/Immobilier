const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const House = sequelize.define('House', {
        houseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        // option: {
        //     type: DataTypes.STRING,
        // },
        finance: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        cash: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        ensuite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        study: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        alarmSystem: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        floorboards: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        rumpusRoom: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dishwasher: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        builtInRobes: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        broadband: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        gym: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        workshop: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        swimmingPool: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        balcony: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        undercoverParking: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        fullyFenced: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tennisCourt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        garage: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        outdoorArea: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        shed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        outdoorSpa: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        airConditioning: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        heating: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        solarPanels: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        highEnergyEfficiency: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        priceRange: {
            type: DataTypes.STRING,
        },
        bedrooms: {
            type: DataTypes.INTEGER,
        },
        bathrooms: {
            type: DataTypes.INTEGER,
        },
        carSpaces: {
            type: DataTypes.INTEGER,
        },
        purchaseTimeframe: {
            type: DataTypes.STRING,
        },
        landSize: {
            type: DataTypes.INTEGER,
        },
        location: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        }
    });

    return House;
}
