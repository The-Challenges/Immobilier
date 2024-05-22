const { Sequelize, DataTypes } = require('sequelize');


module.exports = (Sequelize, DataTypes) => {
  const Access = Sequelize.define('Access', {
  
    options: {
      type: DataTypes.ENUM('Airport','Public transportation','Highway','road access','Unknown'),
      defaultValue:'Unknown'
    },

  });

  return Access;
};