const sequelize = require('./db')


const {DataTypes} = require("sequelize");
const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
});

module.exports = Class;