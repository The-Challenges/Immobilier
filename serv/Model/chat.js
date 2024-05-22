const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Chat = sequelize.define('Chat', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
     
  return Chat;
};
