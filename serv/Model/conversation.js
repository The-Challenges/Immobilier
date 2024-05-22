module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('conversation', {}, {
      timestamps: false
    });
    Conversation.associate = (models) => {
      Conversation.belongsTo(models.User, { as: 'User1' });
      Conversation.belongsTo(models.User, { as: 'User2' });
      Conversation.hasMany(models.Chat);
    }

    return Conversation;
  };
  