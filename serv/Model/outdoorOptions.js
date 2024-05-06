const { Sequelize, DataTypes } = require('sequelize');


module.exports = (Sequelize, DataTypes) => {
  const Outdoor = Sequelize.define('Outdoor', {
   
    options: {
      type: DataTypes.ENUM('Swimming pool','Balcony','Undercover parking','Fully fenced','Tennis court','Garage','Outdoor area','Shed','Outdoor spa','Unknown'),
      defaultValue:'Unknown'
    },
 
  });

  return Outdoor;
};
