// favouriteHouse.js
module.exports = (sequelize, DataTypes) => {
  const FavouriteHouse = sequelize.define('FavouriteHouse', {
    houseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'houses', // This should match the table name as defined in the database
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // This should match the table name as defined in the database
        key: 'id',
      }
    }
  });

  return FavouriteHouse;
};
