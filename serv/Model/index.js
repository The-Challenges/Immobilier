

const { Sequelize, DataTypes } = require('sequelize');
const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = require("../config/config")

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost',
});

async function authenticateConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

authenticateConnection()

// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to synchronize database:', error);
//   });

const User = require('./users')(sequelize, DataTypes);
const Chat = require('./chat')(sequelize, DataTypes);
const Favourite = require('./favourite')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);
const House = require('./house')(sequelize, DataTypes);
const Land = require('./land')(sequelize, DataTypes);
const Notification = require('./notification')(sequelize, DataTypes);
const Conversation = require('./chat')(sequelize, DataTypes);


User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Favourite, { foreignKey: 'userId' });
House.hasMany(Favourite, { foreignKey: 'houseId' });
Land.hasMany(Favourite, { foreignKey: 'landId' });
Favourite.belongsTo(User, { foreignKey: 'userId' });
Favourite.belongsTo(House, { foreignKey: 'houseId' });
Favourite.belongsTo(Land, { foreignKey: 'landId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

Conversation.hasMany(Chat, { foreignKey: 'conversationId' });
Chat.belongsTo(Conversation, { foreignKey: 'conversationId' });


// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Chat,
  Favourite,
  Payment,
  House,
  Land,
  Notification
};
