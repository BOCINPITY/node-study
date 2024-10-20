const allowOrigins = [
    "http://127.0.0.1:5500",
    "null"
]

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        console.log("这是一个预检请求")
        res.header('access-control-allow-method',req.headers['access-control-request-method'])
        res.header('access-control-allow-headers',req.headers['access-control-request-headers'])
    }

    //处理简单请求
    if("origin" in req.headers && allowOrigins.includes(req.headers.origin)){
        res.header("access-control-allow-origin",req.headers.origin)
    }
    //携带cookie的时候要明确告诉客户端可以携带，不然响应给浏览器的时候浏览器依然会认为跨域了
    res.header("access-control-allow-credentials",true)
    next()
}