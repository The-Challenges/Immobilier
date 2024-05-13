module.exports = (sequelize, DataTypes) => {
    const RequestLand = sequelize.define('RequestLand', {
        status: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        userId: {
            type: DataTypes.INTEGER,
            references: { model: 'User', key: 'id' }
          },
          landId: {
            type: DataTypes.INTEGER,
            references: { model: 'Land', key: 'id' }
          }
    });
    return RequestLand;
  };
  