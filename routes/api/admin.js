const express = require("express")
const router = express.Router()
const admServ = require("../../services/adminService")
const sendMsg = require("../utils/getSendResult")
const jwt = require("../jwt")

router.post("/login", async (req, res) => {
    try {
        const result = await admServ.login(req.body.loginId, req.body.loginPwd)
        if (result) {
            jwt.publish(res, {id: result.id}, undefined)
            res.send(sendMsg.getResult(result))
        } else {
            res.send(sendMsg.getResult("登录失败",400))
        }
    } catch (err) {
        res.send(sendMsg.getErr(err))
    }
})

router.get("/whoami", async (req, res) => {
    try {
        const result = await admServ.getAdminById(req.userId)
        if (result) {
            res.send(sendMsg.getResult(result))
        }
    } catch (err) {
        res.send(sendMsg.getErr(err))
    }
})
module.exports = router

