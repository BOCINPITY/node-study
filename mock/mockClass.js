const Mock = require('mockjs')
const data = Mock.mock({
    "list|16": [{
        "id|+1": 1,
        name: "物联网工程第 @id 期",
        startTime: "@date"
    }],
})

const Class = require("../models/Class")

Class.bulkCreate(data.list).then(r => {
})