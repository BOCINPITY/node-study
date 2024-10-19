const secret = Buffer.from('e95ol1ko13e4ggij');
const crypto = require("crypto");

exports.esc = function () {
    const iv = crypto.randomBytes(12);
    return {
        encrypt(str) {
            const cry = crypto.createCipheriv("aes-128-ocb", secret, iv, { authTagLength: 16 });
            let result = cry.update(str, "utf-8", "hex");
            result += cry.final("hex");
            const authTag = cry.getAuthTag().toString('hex');
            return { result, iv: iv.toString('hex'), authTag };
        },
        decrypt(encrypted) {
            const { result, iv, authTag } = encrypted;
            const decry = crypto.createDecipheriv("aes-128-ocb", secret, Buffer.from(iv, 'hex'), { authTagLength: 16 });
            decry.setAuthTag(Buffer.from(authTag, 'hex'));
            let decrypted = decry.update(result, "hex", "utf-8");
            decrypted += decry.final("utf-8");
            return decrypted
        }
    };
}

const ins = module.exports.esc();

const encrypted = ins.encrypt("1");
console.log(encrypted)
const decrypted = ins.decrypt(encrypted);
console.log(decrypted)