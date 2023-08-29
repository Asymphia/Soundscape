const crypto = require('crypto')

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

const encrypt = (text) => {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + encrypted
}

const decrypt = (encryptedText) => {
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)

    let decrypted = decipher.update(encryptedText.slice(32), 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

module.exports = { encrypt, decrypt }