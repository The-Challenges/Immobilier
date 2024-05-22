const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Media = sequelize.define('Media', {
        type: {
            type: DataTypes.ENUM('pdf', 'jpg', 'png')
        },
        name: DataTypes.STRING,
        link: DataTypes.STRING,



        ///////////////////////

    });




    return Media;
};
