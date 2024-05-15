module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('RequestHouse', {
    status: {
      type: DataTypes.ENUM("pending","Rejected","Confirmed"),
      defaultValue:'pending'
    },
  });

  return Request;
};
