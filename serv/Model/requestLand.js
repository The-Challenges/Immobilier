module.exports = (sequelize, DataTypes) => {
  const RequestLand = sequelize.define('RequestLand', {
 
      status: {
          type: DataTypes.ENUM("pending", "Rejected", "Confirmed"),
          defaultValue: 'pending'
      },
  });

  return RequestLand;
};
