const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const Climate = sequelize.define('Climate', {
    options: {
      type: DataTypes.ENUM('Air conditioning','Heating','Solar panels','High energy efficiency','Unknown'),
      defaultValue:'Unknown'
    },
    HouseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Houses', 
        key: 'id'
      }
    }
  });

  

  return Climate;
};
