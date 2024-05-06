


module.exports = (Sequelize, DataTypes) => {
  const Comment = Sequelize.define('Comment', {
   comment:{
    type: DataTypes.STRING,
     
   }
  
 
  });

  return Comment;
};
