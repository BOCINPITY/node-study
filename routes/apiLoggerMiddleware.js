const {apiLogger} = require("../logger")

module.exports = (req,res,next) => {
    next()
    apiLogger.debug(`${req.method} ${req.path} ${req.ip}`)

}