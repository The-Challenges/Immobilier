
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    const Conversation = Sequelize.define('Conversation', {})
   
    
    const Chat = Sequelize.define('Chat', {
      chatId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    })
     
    return Chat
    
}
