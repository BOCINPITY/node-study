const sequelize = require('./db')

const {DataTypes} = require("sequelize");
const moment = require('moment')
const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            return this.getDataValue("birthday").getTime()
        }
    },
    age: {
        type: DataTypes.VIRTUAL,
        get() {
            const now = moment.utc()
            const birthday = moment.utc(this.birthday)
            return now.diff(birthday, 'y') // 得到两个时间之间的差异
        }
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
});

module.exports = Student;