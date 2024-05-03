const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define('UserProfile', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {  // If you still want this to be editable, ensure the UI handles changes appropriately.
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        email: {  // Same note as for username, regarding its editable status.
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^[0-9]+$/, // Regex to ensure only numbers are entered (simplified example)
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        interests: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return UserProfile;
}
