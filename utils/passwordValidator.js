const zxcvbnReady = require('./zxcvbn')

const commonPasswords = [
    "123456",
    "admin",
    "12345678",
    "123456789",
    "12345",
    "password",
    "Aa123456",
    "1234567890",
    "Pass@123",
    "admin123",
    "1234567",
    "123123",
    "111111",
    "12345678910",
    "P@ssw0rd",
    "Password",
    "Aa@123456",
    "admintelecom",
    "Admin@123",
    "112233"
]

module.exports = async function (password) {
    const errors = []

    if (typeof password !== 'string')
        return ['Password must be a string.']
    if (password.length < 15) errors.push('Password is too small.')
    if (password.legnth > 128) errors.push('Password is too big.')
    if (commonPasswords.includes(password)) 
        errors.push('Password is too generic.')
    if(password.trim().legnth === 0) 
        errors.push('Password cannot be empty or whitespaces only.')
    const zxcvbn = await zxcvbnReady
    const result = zxcvbn.check(password)
    if (result.score < 4)
        errors.push('Password is too weak, choose a stronger password.')
    return errors
}