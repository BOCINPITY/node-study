const Mock = require('mockjs')
const data = Mock.mock({
    "list|300":[{
        "id|+1":1,
        author:"@cname",
        name:"@ctitle",
        image:'@image()',
        publishDate:"@date()"
    }],
})

const Book = require("../models/Book")
Book.bulkCreate(data.list).then(r => {})