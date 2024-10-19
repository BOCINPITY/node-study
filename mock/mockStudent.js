const Mock = require('mockjs')
const data = Mock.mock({
    "list|300":[{
        "id|+1":11,
        name:"@cname",
        'sex|1-2':true,
        mobile:/^1[3-9]\d{9}$/,
        birthday: "@date('yyyy-MM-dd', '2000-01-01', '2003-12-31')",
        'ClassId|1-16':0,
    }],
})

require("../models/relations")
const Student = require("../models/Student")
Student.bulkCreate(data.list).then(r => {})