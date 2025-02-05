const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('amazonbd', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;