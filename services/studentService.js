const Student = require("../models/Student")
const Class = require("../models/Class")
const {Op} = require("sequelize")
const student = require('../rules/student/index')
const validate = require("validate.js");
const {pick} = require("../utils/propertyHelper")

exports.addStudent = async function (studentObj) {
    validate.validators.classExist = async function (value) {
        const isExist = await Class.findByPk(value)
        if (isExist) return
        return "Class is not exist"
    }
    //只需要传递包含这些属性的对象
    studentObj = pick(studentObj, "name", "sex", "mobile", "birthday", "ClassId")
    await validate.async(studentObj, student.studentObjRule)
    const ins = await Student.create(studentObj)
    return ins.toJSON()
}

exports.delStudent = async function (studentId) {
    await Student.destroy({
        where: {
            id: studentId
        }
    })
}

exports.updateStudent = async function (studentId, studentObj) {
    const ins = await Student.findByPk(studentId)
    const result = await ins.update(studentObj)
    return result.toJSON()
}

exports.getStudentById = async function (studentId) {
    const result = await Student.findByPk(studentId)
    return result ? result.toJSON() : null
}


/**
 * @param {number | boolean} sex
 *
 **/
exports.getStudents = async function (page = 1, limit = 10, sex = -1, name = '') {

    const condition = {}
    if (sex !== -1) condition.sex = !!sex
    if (name) condition.name = {
        [Op.like]: `%${name}%`
    }


    const results = await Student.findAndCountAll({
        offset: (page - 1) * limit,
        include: Class,
        limit: +limit,
        where: condition
    });
    return {
        list: results.rows,
        total: results.count
    }
}
