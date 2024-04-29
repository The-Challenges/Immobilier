const { Sequelize, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {

    const Favourite = Sequelize.define('Favourite', {});

    
    return Favourite
}
