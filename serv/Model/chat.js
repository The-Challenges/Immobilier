const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Chat = sequelize.define('Chat', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time: {
      type:  DataTypes.DATE,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  Chat.associate = (models) => {
    Chat.belongsTo(models.Conversation, { foreignKey: 'conversationId', as: 'Conversation' });
    Chat.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender' });
  };
  return Chat;
};
