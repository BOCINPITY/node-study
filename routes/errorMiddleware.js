// 处理错误的中间件
const {getErr} = require("./utils/getSendResult")
module.exports = (err, req, res, next) => {
    if (err) {
        res.status(500).send(getErr(err))
    } else {
        next()
    }
}