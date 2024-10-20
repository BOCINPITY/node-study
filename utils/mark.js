const {Jimp, BlendMode} = require("jimp");
/**
 * @param {string} waterPath 水印图片的绝对路径
 * @param {string} originPath 原始图片的绝对路径
 * @param {string} targetPath 加水印之后的图片存放的路径(绝对)
 * @param {number} proportion 水印图片相对于原始图片的缩放比例
 * @param {number} marginProportion 水印图片相对于原始图片的外边距
 **/
module.exports = async function (waterPath, originPath, targetPath, proportion = 10, marginProportion = 0.05) {
    const water = await Jimp.read(waterPath)
    const origin = await Jimp.read(originPath)
    //对水印图片进行缩放
    const currentProportion = origin.bitmap.width / water.bitmap.width
    water.scale(currentProportion / proportion)

    const right = origin.bitmap.width * marginProportion
    const bottom = origin.bitmap.height * marginProportion
    const x = origin.bitmap.width - right - water.bitmap.width
    const y = origin.bitmap.height - bottom - water.bitmap.height
    //写入水印
    origin.composite(water, x, y, {mode: BlendMode.SRC_OVER, opacitySource: 0.3})
    await origin.write(targetPath)
}