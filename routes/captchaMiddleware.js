const express = require("express")
const router = express.Router()
const svgCaptcha = require('svg-captcha');
router.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
        size: 6,
        color: true
    });
    req.session.captcha = captcha.text;
    console.log(captcha.text)
    res.type('svg');
    res.status(200).send(captcha.data);
})

function captchaHandle(req, res, next) {
    if (!req.session.records) {
        console.log("被从新赋值了")
        req.session.records = []
    }
    const now = Date.now()
    req.session.records.push(now)
    console.log(req.session.records)
    next()
}

router.post("*", captchaHandle)
router.put("*", captchaHandle)


module.exports = router