exports.pick = function (obj, ...props) {
    if (!obj || typeof obj !== 'object') return obj
    const newObj = {}
    for (const objKey in obj) {
        if (props.includes(objKey)) {
            newObj[objKey] = obj[objKey]
        }
    }
    return newObj
}
