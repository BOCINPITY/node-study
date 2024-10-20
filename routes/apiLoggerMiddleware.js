const {apiLogger} = require("../logger")

module.exports = (req,res,next) => {
    apiLogger.debug(`${req.method} ${req.path} ${req.ip}`)
    next()
}