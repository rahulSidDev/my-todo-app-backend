const express = require('express')
const router = express.Router()

const login = require('../controllers/user/login')
const signup = require('../controllers/user/signup')
const sendOtp = require('../controllers/user/sendOtp')
const profile = require('../controllers/user/profile')
const changePass = require('../controllers/user/changePass')
const forgotPass = require('../controllers/user/forgotPass')
const forgotPassSendOtp = require('../controllers/user/forgotPassSendOtp')
const remove = require('../controllers/user/delete')
const update = require('../controllers/user/update')

const auth = require('../middleware/auth')

router.post('/login', login)
router.post('/signup', signup)
router.post('/send-otp', sendOtp)
router.post('/change-password', auth, changePass)
router.post('/forgot-password', forgotPass)
router.post('/forgot-password/send-otp', forgotPassSendOtp)
router.post('/logout', auth, async (req, res) => {
    res.clearCookie('myCookie')
    return res.status(200).json({
        success: true,
        message: 'successfully logged out.'
    })
})

router.get('/', auth, profile)

router.put('/', auth, update)

router.delete('/', auth, remove)

module.exports = router