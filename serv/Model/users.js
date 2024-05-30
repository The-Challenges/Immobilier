const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    age: {
      type: DataTypes.STRING,
    },
    alt: {
      type: DataTypes.FLOAT
    },
    long: {
      type: DataTypes.FLOAT
    },
  
 
  });
//////////////////////////////
  User.associate = function(models) {
    User.hasOne(models.Media, {
        foreignKey: 'userId',
        as: 'media' 
    });
};
User.associate = (models) => {
  User.hasMany(models.Chat, { foreignKey: 'senderId', as: 'SentMessages' });
  User.belongsToMany(models.Conversation, {
    through: 'UserConversations',
    as: 'Conversations',
    foreignKey: 'userId',
    otherKey: 'conversationId'
  });
};
// User.hasMany(models.Conversation, { foreignKey: 'User1Id', as: 'User1Conversations' });
// User.hasMany(models.Conversation, { foreignKey: 'User2Id', as: 'User2Conversations' });

  return User;
};
