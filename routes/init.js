const express = require('express')
const path = require("path")
const app = express()
const port = 9527
const cookieParser = require("cookie-parser")
const session = require("express-session")
/**
 * session中间件
 **/
app.use(session({
    secret: 'keyboard cat',
}))

app.use(require('./proxyMiddleware'))
app.use(require("./imageProtectMiddleware"))


/**
 *  下面这段代码的作用
 *  当请求的时候，会根据请求的路径，从指定的目录中寻找是否存在该文件，如果存在，直接响应文件内容，而不再移交给后续的中间件
 *  如果不存在文件，则直接交给后续的中间件处理
 *  默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件了
 **/
app.use(express.static(path.resolve(__dirname, "../public"), {
    setHeaders(res, path) {
        if (!path.endsWith('.html')) {
            res.header("Cache-Control", `max-age=${3600 * 1000}`)
        }
    }
}))


/**
 * cors中间件
 * 主要解决跨域的相关问题
 **/
const cors = require("cors")

app.use(cors({
        exposedHeaders: ['authorization'],
        credentials: true,
        origin: 'http://127.0.0.1:5500'
    }
))


/**
 *  加入cookieParser中间件
 *  加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
 *  加入之后，会在res对象中注入cookie方法，用于设置cookie
 **/
app.use(cookieParser("bit"))

/**
 * token中间件
 **/

app.use(require("./tokenMiddleware"))


// 解析application/x-www-form-urlencoded格式的请求
app.use(express.urlencoded({extended: true}))

// 解析application/json格式的请求体
app.use(express.json())


app.use(require("./apiLoggerMiddleware"))
app.use(require('./captchaMiddleware'))
app.use('/api/student', require('./api/student'))
app.use('/api/admin', require('./api/admin'))
app.use('/file', require('./api/fileUpload'))
app.use("/download", require("./api/download"))
app.use(require("./errorMiddleware"))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})