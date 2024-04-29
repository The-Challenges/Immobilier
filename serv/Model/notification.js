
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    const Notification = Sequelize.define('Notification', {
        notificationId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING(45),
          allowNull: false,
          defaultValue: 'unread'
        },
        type: {
          type: DataTypes.ENUM('email', 'mobile', 'general'),
          defaultValue: 'general'
        }
      });
      
  return Notification
}