const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/upload"))
    },
    //处理文件存储名字
    filename: function (req, file, cb) {
        const fName = Date.now() + '-' + Math.random().toString(36).slice(-6) + path.extname(file.originalname)
        cb(null, fName)
    },
})
const upload = multer({
    storage, limits: {
        fileSize: 1024 * 1024 * 5//5mb
    }, fileFilter(req, file, cb) {
        if (file.mimetype.split('/')[0] !== 'image'){
            cb(null,false)
        }else{
            cb(null,true)
        }
    }
})
router.post("/upload/single", upload.single("img"), (req, res, next) => {
    const url = `http://127.0.0.1:9527/upload/${req.file.filename}`
    res.send({
        code: 200,
        msg: "success",
        data: url
    })
})


module.exports = router