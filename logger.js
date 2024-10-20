const path = require("path")

const log4js = require("log4js")

function getCommonAppender(pathFragment){
    return {
        type: "dateFile",
        filename: path.resolve(__dirname, "logs", pathFragment, `${pathFragment}.log`),
        maxLogSize: 1024 ** 2,
        keepFileExt: true,
        daysToKeep: 3,
        layout: {
            type: "pattern",
            pattern: "[%d{yyyy-MM-dd hh:mm:ss}] %p %c: %m%n"
        }
    }
}


log4js.configure({
    appenders: {
        default: {
            //定义一个default日志出口
            type: "stdout",
        },
        sql: getCommonAppender("sql"),
        api: getCommonAppender("api")
    },
    categories: {
        default: {
            appenders: ["default"],
            level: "all"
        },
        sql: {
            appenders: ["sql"], // 该分类使用出口sql的配置写入日志
            level: "all"
        },
        api: {
            appenders: ["api"], // 该分类使用出口sql的配置写入日志
            level: "all"
        }
    }
})
process.on("exit", () => {
    log4js.shutdown()
})

exports.sqlLogger = log4js.getLogger("sql")
exports.apiLogger = log4js.getLogger("api")
exports.logger = log4js.getLogger()
