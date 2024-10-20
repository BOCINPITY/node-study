// const http = require("http")


/**
 * 代理练习，请求本地的api fox的mock数据
 **/

// module.exports = (req, res, next) => {
//     const context = "/data"
//     if (!req.path.startsWith(context)) {
//         next()
//         return
//     }
//     // //需要代理
//     const path = req.path.substring(context.length)
//     const request = http.request({
//         host: "localhost",
//         port: 4523,
//         path: `/m1/4467012-4113280-default${context}${path}`,
//         method: req.method,
//         headers: req.headers,
//     }, response => {
//         res.status(response.statusCode) //响应码
//         for (const headersKey in response.headers) {
//             res.setHeader(headersKey, response.headers[headersKey])
//         }
//         response.pipe(res)
//     })
//     req.pipe(request)
// }

/**
 *  第三方中间件的使用练习
 *
 **/

const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = createProxyMiddleware({
    target: 'http://localhost:4523',
    pathFilter:['/data'], //这里填写需要代理的path,api是本服务器提供的，不需要它代理，只需要代理path为的请求/data
    pathRewrite: function (path, req) {
        return `/m1/4467012-4113280-default${path}`
    }
});

// 'apiProxy' is now ready to be used as middleware in a server.