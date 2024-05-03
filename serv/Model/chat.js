const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Chat = sequelize.define('Chat', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipientRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
  }, {
    timestamps: true
  });
     
  return Chat;
};
