const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    const House = Sequelize.define('House', {
        houseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        location: DataTypes.STRING,
        mapLocation: DataTypes.STRING,
        picture: DataTypes.STRING,
        numberOfRooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        Option: {
            type: DataTypes.STRING
        }
    });

    return House;
};
