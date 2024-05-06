

module.exports = (Sequelize, DataTypes) => {
  const Media = Sequelize.define('Media', {
   type:{
    type: DataTypes.ENUM('pdf','jpg','png'),
   
   },
name:{
    type: DataTypes.STRING,
  
},
link:{
    type: DataTypes.STRING,
  
}
 
  });

  return Media;
};
