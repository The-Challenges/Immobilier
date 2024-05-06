const { Sequelize, DataTypes } = require('sequelize');


module.exports = (Sequelize, DataTypes) => {
  const Indoor = Sequelize.define('Indoor', {
   
    options: {
      type: DataTypes.ENUM('Ensuite','Study','Alarm System','FloorBoards','Rumpus room','Dishwasher','Built in robe','Broadband','Gym','Workshop','Unknown'),
      defaultValue:'Unknown'
    },
 
  });

  return Indoor;
};
