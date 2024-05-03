const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Land = sequelize.define('Land', {
        landId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        photos: {
            type: DataTypes.JSON, // Store an array of photo URLs
            defaultValue: []
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Assuming prices can have cents and are not too high
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 0
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idCard: {
            type: DataTypes.STRING,
            allowNull: false
        },
        certificate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Land;
}
