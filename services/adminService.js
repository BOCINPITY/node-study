const Admin = require("../models/Admin")
const MD5 = require("md5")

exports.addAdmin = async function (adminObj){
    adminObj.loginPwd = MD5(adminObj.loginPwd)
    const ins =  await Admin.create(adminObj)
    return ins.toJSON()
}

exports.delAdmin = async function (adminId){
    await Admin.destroy({
        where:{
            id:adminId
        }
    })
}

exports.updateAdmin = async function (adminId,adminObj){
    const ins = await Admin.findByPk(adminId)
    return await ins.update(adminObj)
}

exports.login = async function(loginId,loginPwd){
    loginPwd = MD5(loginPwd)
    const result = await Admin.findOne({
        where:{
            loginId,
            loginPwd
        },
    })
    if (result && result.loginPwd === loginPwd){
        return result.toJSON()
    }
    return null
}

exports.getAdminById = async function(adminId){
    const result = await Admin.findByPk(adminId)
    return result ? result.toJSON() : null
}

// module.exports.addAdmin({
//     name:"clesbit",
//     loginId:"qinjian",
//     loginPwd:"0517",
// }).then(r => {console.log(r)})