const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    age: {
      type: DataTypes.STRING,
    },
    alt: {
      type: DataTypes.FLOAT
    },
    long: {
      type: DataTypes.FLOAT
    },
    deviceToken: {
      type: DataTypes.STRING,
      allowNull: true // Device token can be null initially
    }
    // Uncomment and add these fields if needed
    // isEmailVerified: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    // isMobileVerified: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    // userType: {
    //   type: DataTypes.ENUM('user', 'admin'),
    //   defaultValue: 'user'
    // }
  });

  return User;
};
