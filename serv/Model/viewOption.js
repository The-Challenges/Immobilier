module.exports = (Sequelize, DataTypes) => {
  const View = Sequelize.define('View', {
   
    options: {
      type: DataTypes.ENUM('mountain','water views','city skyline','Unknown'),
      defaultValue:'Unknown'
    },
 
  });

  View.associate = function(models) {
    View.belongsTo(models.Land, {
        foreignKey: 'LandId',
        as: 'land'  
    });

  }

  

  return View;
};
