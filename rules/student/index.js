const moment = require("moment")
exports.studentObjRule = {
    name: {
        presence: {allowEmpty: false},
        type: "string",
        length: {
            minimum: 1,
            maximum: 10,
        }
    },
    birthday: {
        presence: {allowEmpty: false},
        datetime: {
            dateOnly: true,
            earliest: +moment.utc().subtract(100, 'y'),
            latest: +moment.utc().subtract(5, 'y')
        }
    },
    sex: {
        presence: true,
        type: 'boolean'
    },
    mobile: {
        presence: {allowEmpty: false},
        format: /^1[3-9]\d{9}$/,
    },
    ClassId: {
        presence: {allowEmpty: false},
        numericality: {
            onlyInteger: true,
            strict: false,
        },
        classExist:true,
    }
}