// 颁发jwt
const jwt = require("jsonwebtoken")
const cookieKey = "token"
const secret = 'av7a2tkc'
exports.publish = function (res, info = {}, maxAge = 3600 * 24 * 1000) {
    const token = jwt.sign(info, secret, {expiresIn: maxAge})
    // 添加到cookie
    res.cookie(cookieKey, token, {
        maxAge: maxAge,
        path: "/"
    })
    //添加到其他传输，比如http响应头
    res.header("authorization", token);
}

exports.verify = function (req) {

    let token;
    // 尝试从cookie中获取
    token = req.cookies[cookieKey];
    console.log(token)
    if (!token) {
        // 从请求头取
        token = req.headers.authorization
        if (!token) {
            //还是没有token，直接返回
            return null
        }
        token = token.split(" ")
        token = token.length === 1 ? token[0] : token[1]

    }
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        return null
    }
}