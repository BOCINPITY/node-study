const Class = require("./Class");
const Student = require("./Student");

// 设置模型关系
Student.belongsTo(Class, { foreignKey: 'ClassId', constraints: false });
Class.hasMany(Student);
