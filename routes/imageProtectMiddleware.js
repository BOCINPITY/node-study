const {resolve} = require("node:path");
const path = require("node:path");
const allowList = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
]
module.exports = (req, res, next) => {
    const host = req.headers.host
    const referer = req.headers.referer
    const extname = path.extname(req.path)

    if (referer && !referer.includes(host) && allowList.includes(extname)) {
        console.log()
        //响应其他的图片给客户端
        res.header("Content-Type", "image/png")
        res.sendFile(resolve(__dirname, "../resources/defense.png"))
        return
    }
    next()
}