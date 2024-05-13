

const { Sequelize, DataTypes } = require('sequelize');
const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = require("../config/config");

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost',
});

// async function authenticateConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// authenticateConnection()

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
const Conversation = require('./conversation')(sequelize, DataTypes)
const Media =require('./media')(sequelize,DataTypes)
const Indoor =require('./indoorOption')(sequelize,DataTypes)

const Outdoor =require('./outdoorOptions')(sequelize,DataTypes)

const View =require('./viewOption')(sequelize,DataTypes)
const Climat =require('./climate')(sequelize,DataTypes)
const Comment =require('./comment')(sequelize,DataTypes)
const Access =require('./accesOption')(sequelize,DataTypes)
const RequestHouse =require('./requestHouse')(sequelize,DataTypes)
const RequestLand =require('./requestLand')(sequelize,DataTypes)

/* **********************************************************user relationships******************************************** */
User.hasMany(House);
House.belongsTo(User);


User.hasMany(Land);
Land.belongsTo(User);

User.hasMany(Media);
Media.belongsTo(User);

User.hasMany(RequestHouse);
RequestHouse.belongsTo(User);
User.hasMany(RequestLand);
RequestLand.belongsTo(User);

User.hasMany(Favourite);
Land.hasMany(Favourite);
User.hasMany(Comment);
Comment.belongsTo(User);

/* **********************************************************land relationships******************************************** */
Land.hasMany(Access);
Access.belongsTo(Land);
Land.hasMany(View);
View.belongsTo(Land);
Land.hasMany(Media);
Media.belongsTo(Land);
Land.hasMany(Comment);
Comment.belongsTo(Land);
// Land.hasMany(RequestLand)
// RequestLand.belongsTo(Land)


// Land.belongsToMany(User, { through: RequestLand, foreignKey: 'landId' });
// User.belongsToMany(Land, { through: RequestLand , foreignKey: 'userId'});
// Land.belongsTo(User, { as: 'Owner', foreignKey: 'ownerId' });
// User.hasMany(Land, { foreignKey: 'ownerId' });

// Requests

Land.belongsToMany(User, { through: RequestLand, foreignKey: 'landId' });
User.belongsToMany(Land, { through: RequestLand, foreignKey: 'userId' });
RequestLand.belongsTo(User, { foreignKey: 'userId' });
RequestLand.belongsTo(Land, { foreignKey: 'landId' });

///////////////////////////////////////////other

// User model association within the Sequelize define call
// User.associate = function(models) {
//   User.belongsToMany(models.Land, { through: models.RequestLand, foreignKey: 'userId' });
// };

// // Land model association within the Sequelize define call
// Land.associate = function(models) {
//   Land.belongsToMany(models.User, { through: models.RequestLand, foreignKey: 'landId' });
//   Land.hasMany(models.Media, { as: 'images', foreignKey: 'LandId' });
// };

// // RequestLand model associations
// // User model associations
// User.associate = function(models) {
//   User.belongsToMany(models.Land, { 
//       through: models.RequestLand, 
//       foreignKey: 'userId', // Explicitly defining the foreign key
//       otherKey: 'landId'    // Define the other key in the relation
//   });
// };

// // Land model associations
// Land.associate = function(models) {
//   Land.belongsToMany(models.User, { 
//       through: models.RequestLand, 
//       foreignKey: 'landId', // Explicitly defining the foreign key
//       otherKey: 'userId'    // Define the other key in the relation
//   });
 
// };

// // RequestLand model associations
// RequestLand.associate = function(models) {
//   RequestLand.belongsTo(models.User, { 
//       as: 'user', 
//       foreignKey: 'userId' // Ensure this matches the 'foreignKey' in the belongsToMany association
//   });
//   RequestLand.belongsTo(models.Land, { 
//       as: 'land', 
//       foreignKey: 'landId' // Ensure this matches the 'foreignKey' in the belongsToMany association
//   });
// };


///












// RequestLand.belongsTo(Land, { foreignKey: 'landId' });
// To access the RequestLand explicitly
// Land.belongsTo(User, { as: 'Owner', foreignKey: 'ownerId' });
// User.hasMany(Land, { foreignKey: 'ownerId' });

// RequestLand.belongsTo(Land, { foreignKey: 'landId' });
// Land.hasMany(RequestLand, { foreignKey: 'landId' });

// RequestLand.belongsTo(User, { as: 'Requester', foreignKey: 'userId' });
// User.hasMany(RequestLand, { foreignKey: 'userId' });


/* **********************************************************house relationships******************************************** */
House.hasMany(Comment);
Comment.belongsTo(House);
House.hasMany(Climat);
Climat.belongsTo(House);
House.hasMany(Indoor);
Indoor.belongsTo(House);
House.hasMany(Outdoor);
Outdoor.belongsTo(House);
House.hasMany(View);
View.belongsTo(House);
House.hasMany(Media);
Media.belongsTo(House);
// House.hasMany(RequestHouse)
// RequestHouse.belongsTo(House)
House.belongsToMany(User, { through: RequestHouse,foreignKey: 'houseId' });
User.belongsToMany(House, { through: RequestHouse ,foreignKey: 'userId' });








Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Chat.belongsTo(Conversation);
Conversation.hasMany(Chat);
/* **********************************************************jointable relationships******************************************** */

// Conversation.hasMany(User, { through: 'ConversationUser' });
// User.belongsToMany(User)

// Favourite.belongsTo(User);
// Favourite.belongsTo(House);
// Favourite.belongsTo(Land);

// User.hasMany(Notification);
// Notification.belongsTo(User);

// User.hasMany(Chat);
// Chat.belongsTo(User);

// Conversation.hasMany(Chat);
// Chat.belongsTo(Conversation);
// async function  test(params) {
//   await sequelize.sync({ force: true });
// console.log('The table for the User model was just (re)created!');
// }
// test()
// sequelize.sync({ force: true })
// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Chat,
  Favourite,
  Payment,
  House,
  Land,
  Notification,
  Media,Comment,
  Indoor,
  Outdoor,
  View,
  RequestHouse,
  RequestLand,
  Climat,
  Conversation,
  Access,
  
};
