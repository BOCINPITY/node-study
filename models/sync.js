require("./Student")
require("./Class")
require("./Book")
require("./Admin")


const sequelize = require('./db')

sequelize.sync().then(() => {
    console.log("All models are synced")
})