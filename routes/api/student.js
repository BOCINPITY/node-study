const express = require("express")
const router = express.Router()
const stuServ = require("../../services/studentService")
const sendMsg = require("../utils/getSendResult")

//获取学生

router.get("/", async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const sex = req.query.sex || -1
    const name = req.query.name || ''
    const result = await stuServ.getStudents(page, limit, sex, name)
    res.send(sendMsg.getResult(result))
})

//获取单个学生
router.get("/:id", async (req, res) => {
    const result = await stuServ.getStudentById(req.params.id)
    if (!result) {
        res.send(sendMsg.getResult("该学生不存在"))
    } else {
        res.send(sendMsg.getResult(result))
    }
})

//添加学生
router.post("/", async (req, res, next) => {
    try {
        const result = await stuServ.addStudent(req.body)
        res.send(sendMsg.getResult(result))
    } catch (err) {
        res.send(sendMsg.getResult(err))
    }
})
//删除一个学生
router.delete("/:id", async (req, res) => {
    try {
        const result = await stuServ.delStudent(req.params.id)
        res.send(sendMsg.getResult(result))

    } catch (err) {
        res.send(sendMsg.getErr(err))
    }
})
//修改一个学生
router.put("/:id", async (req, res) => {
    try {
        const result = await stuServ.updateStudent(req.params.id,req.body)
        res.send(sendMsg.getResult(result))
    } catch (err) {
        res.send(sendMsg.getErr(err instanceof Error ? err.message : err))
    }
})

module.exports = router

