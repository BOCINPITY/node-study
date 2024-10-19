/**
 *  @param {string | Object} err
 *  @param {number} errCode
 **/
exports.getErr = function (err = "Server Internal Error", errCode = 500) {
    return {
        code: errCode,
        msg: err
    }
}

exports.getResult = function (result, code = 200, msg = "success") {
    return {
        code,
        msg,
        data: result
    }
}
