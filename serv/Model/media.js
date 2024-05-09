const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Media = sequelize.define('Media', {
        type: {
            type: DataTypes.ENUM('pdf', 'jpg', 'png')
        },
        name: DataTypes.STRING,
        link: DataTypes.STRING,
        
        HouseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Houses',
                key: 'id'
            }
        }
    });

    Media.associate = function(models) {
        Media.belongsTo(models.House, {
            foreignKey: 'HouseId',
            as: 'house'
        });
    };

    return Media;
};
