const path = require("path")

const log4js = require("log4js")
log4js.configure({
    appenders: {
        default: {
            //定义一个default日志出口
            type: "stdout",
        },
        sql: {
            //定义一个sql日志出口
            type: "dateFile",
            filename: path.resolve(__dirname, "logs", "sql", "logging.log"),
            maxLogSize: 1024 ** 2,
            keepFileExt: true,
            layout: {
                type: "pattern",
                pattern: "[%d{yyyy-MM-dd hh:mm:ss}] %p %c: %m%n"
            }
        },
    },
    categories: {
        default: {
            appenders: ["default"],
            level: "all"
        },
        sql: {
            appenders: ["sql"], // 该分类使用出口sql的配置写入日志
            level: "all"
        }
    }
})
process.on("exit", () => {
    log4js.shutdown()
})
const sqlLogger = log4js.getLogger("sql")
const  defaultLogger = log4js.getLogger()

exports.sqlLogger = sqlLogger
exports.logger = defaultLogger