const { Sequelize, DataTypes } = require('sequelize');


module.exports = (Sequelize, DataTypes) => {
  const Climate = Sequelize.define('Climate', {
   
    options: {
      type: DataTypes.ENUM('Air conditioning','Heating','Solar panets','High energy effcincy','Unknown'),
      defaultValue:'Unknown'
    },
 
  });
  Climate.associate = function(models) {
    Climate.belongsTo(models.House, { foreignKey: 'HouseId', as: 'house' });
};
  return Climate;
};
