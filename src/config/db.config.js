const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bikerental', 'vuduydung01', '20226078', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;
