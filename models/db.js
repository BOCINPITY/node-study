const {Sequelize} = require('sequelize');
const {sqlLogger} = require('../logger')

const sequelize = new Sequelize('node_study_database', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    logging: (msg) => {
        sqlLogger.debug(msg)
    }
});

module.exports = sequelize
