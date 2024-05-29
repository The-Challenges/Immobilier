module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('conversation', {}, {
      timestamps: false
    });
 
 
 


    Conversation.associate = (models) => {
      Conversation.hasMany(models.Chat, { foreignKey: 'conversationId', as: 'Messages' });
      Conversation.belongsToMany(models.User, {
        through: 'UserConversations',
        as: 'Participants',
        foreignKey: 'conversationId',
        otherKey: 'userId'
      });
    };
    return Conversation;
  };
  