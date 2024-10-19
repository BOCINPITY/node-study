const sendResult = require("./utils/getSendResult")
const {pathToRegexp} = require("path-to-regexp");
const jwt  = require('./jwt')


const needTokenApi = [
    {method: "POST", path: "/api/student/"},
    {method: "PUT", path: "/api/student/:id"},
    {method: "DELETE", path: "/api/student/:id"},
    // {method: "GET", path: "/api/student"},
    {method: "GET", path: "/api/admin/whoami"},
]

module.exports = (req, res, next) => {
    const apis = needTokenApi.filter(api => {
        const {regexp} = pathToRegexp(api.path)
        return api.method === req.method && regexp.test(req.path)
    })
    if(apis.length === 0){
        next()
        return
    }
    const result = jwt.verify(req)
    if(result){
        console.log("认证通过")
        req.userId = result.id
        next()
    }else{
        console.log("认证未通过")
        handleNonToken(req,res,next)
    }
}

// 处理没有认证的情况
function handleNonToken(req, res, next) {
    res.status(403).send(sendResult.getErr("you don't have any token to access the api", 403))
}