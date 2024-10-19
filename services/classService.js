const Class = require("../models/Class")


exports.addClass = async function (classObj) {
    const ins = await Class.create(classObj)
    return ins.toJSON()
}

exports.delAdmin = async function (classId) {
    await Class.destroy({
        where: {
            id: classId
        }
    })
}

exports.updateClass = async function (classId, classObj) {
    const ins = await Class.findByPk(classId)
    return await ins.update(classObj)
}


exports.getClassById = async function (classId) {
    const result = await Class.findByPk(classId)
    return result ? result.toJSON() : null
}

exports.getClasses = async function () {
    return JSON.stringify(await Class.findAndCountAll())
}