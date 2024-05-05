const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
   
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
    age :{
      type: DataTypes.STRING,
    },
    alt:{
      type: DataTypes.FLOAT    },
      
      long:{
        type: DataTypes.FLOAT    },
        

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
