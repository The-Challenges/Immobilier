const { Sequelize, DataTypes } = require('sequelize');


    module.exports = (Sequelize, DataTypes) => {
        const Payment = Sequelize.define('Payment', {
          paymentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          amount: { type: DataTypes.DECIMAL },
          method: { type: DataTypes.STRING },
          status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending'
          }
        });
       
        return Payment;
      };
    