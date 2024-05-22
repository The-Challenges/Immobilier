module.exports = (sequelize, DataTypes) => {
  const FavouriteLand = sequelize.define('Favouriteland', {
    landId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Land', // This should match the table name if using raw queries or the model name as declared
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
    }
  });

  return FavouriteLand;
};
