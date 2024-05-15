module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversation', {},{timestamps: false});

  
    return Conversation;
  };
  