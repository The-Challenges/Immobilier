const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Indoor = sequelize.define('Indoor', {
        options: {
            type: DataTypes.ENUM(
                'Ensuite', 'Study', 'Alarm System', 'FloorBoards', 'Rumpus room',
                'Dishwasher', 'Built in robe', 'Broadband', 'Gym', 'Workshop', 'Unknown'
            ),
            defaultValue: 'Unknown'
        }
    });

    Indoor.associate = function(models) {
        Indoor.belongsTo(models.House, { foreignKey: 'HouseId', as: 'house' });
    };

    return Indoor;
};
