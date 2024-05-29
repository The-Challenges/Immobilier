const { Sequelize, DataTypes } = require('sequelize');
const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = require("../config/config");

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

authenticateConnection();

const User = require('./users')(sequelize, DataTypes);
const Chat = require('./chat')(sequelize, DataTypes);
const FavouriteHouse = require('./favouriteHouse')(sequelize, DataTypes);
const FavouriteLand = require('./favouriteLand')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);
const House = require('./house')(sequelize, DataTypes);
const Land = require('./land')(sequelize, DataTypes);
const Notification = require('./notification')(sequelize, DataTypes);
const Conversation = require('./conversation')(sequelize, DataTypes);
const Media = require('./media')(sequelize, DataTypes);
const Indoor = require('./indoorOption')(sequelize, DataTypes);
const Outdoor = require('./outdoorOptions')(sequelize, DataTypes);
const View = require('./viewOption')(sequelize, DataTypes);
const Climate  = require('./climate')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize, DataTypes);
const Access = require('./accesOption')(sequelize, DataTypes);
const RequestHouse = require('./requestHouse')(sequelize, DataTypes);
const RequestLand = require('./requestLand')(sequelize, DataTypes);
const ShapeCoordinate = require('./shapeCoordinates')(sequelize, DataTypes);

/* **********************************************************user relationships******************************************** */
User.hasMany(House);
House.belongsTo(User);

User.hasMany(Land);
Land.belongsTo(User);

User.hasMany(Media);
Media.belongsTo(User);

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

Land.hasMany(ShapeCoordinate, { as: 'shapeCoordinates' });
ShapeCoordinate.belongsTo(Land, { foreignKey: 'LandId' });

Land.belongsToMany(User, { through: RequestLand, foreignKey: 'landId' });
User.belongsToMany(Land, { through: RequestLand, foreignKey: 'userId' });

/* **********************************************************house relationships******************************************** */
House.hasMany(Comment);
Comment.belongsTo(House);

House.hasMany(Climate);
Climate.belongsTo(House);

House.hasMany(Indoor);
Indoor.belongsTo(House);

House.hasMany(Outdoor);
Outdoor.belongsTo(House);

House.hasMany(View);
View.belongsTo(House);

House.hasMany(Media);
Media.belongsTo(House);

House.belongsToMany(User, { through: RequestHouse, foreignKey: 'houseId' });
User.belongsToMany(House, { through: RequestHouse, foreignKey: 'userId' });

/* **********************************************************jointable relationships******************************************** */
Conversation.belongsTo(User, { as: 'User1' });
Conversation.belongsTo(User, { as: 'User2' });
Chat.belongsTo(Conversation);
Conversation.hasMany(Chat);

House.belongsToMany(User, { through: FavouriteHouse, foreignKey: 'houseId' });
User.belongsToMany(House, { through: FavouriteHouse, foreignKey: 'userId' });
Land.belongsToMany(User, { through: FavouriteLand, foreignKey: 'landId' });
User.belongsToMany(Land, { through: FavouriteLand, foreignKey: 'userId' });

FavouriteLand.belongsTo(Land, { foreignKey: 'landId' });
Land.hasMany(FavouriteLand, { foreignKey: 'landId', as: 'Favorites' });

FavouriteLand.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(FavouriteLand, { foreignKey: 'userId' });

FavouriteHouse.belongsTo(House, { foreignKey: 'houseId' });
House.hasMany(FavouriteHouse, { foreignKey: 'houseId', as: 'Favorites' });

FavouriteHouse.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(FavouriteHouse, { foreignKey: 'userId' });



// async function test(params) {
//   await sequelize.sync({ force: true });
//   console.log('The table for the User model was just (re)created!');
// }
// test()

module.exports = {
  sequelize,
  User,
  Chat,
  Payment,
  House,
  Land,
  Notification,
  Media,
  Comment,
  Indoor,
  Outdoor,
  View,
  RequestHouse,
  RequestLand,
  Climate,
  Conversation,
  Access,
  FavouriteHouse,
  FavouriteLand,
  ShapeCoordinate
};
