const express = require('express')
const router = express.Router()

const login = require('../controllers/user/login')
const signup = require('../controllers/user/signup')
const signupVerify = require('../controllers/user/signupVerify')
const changePass = require('../controllers/user/changePass')
const forgotPass = require('../controllers/user/forgotPass')
const forgotPassVerify = require('../controllers/user/forgotPassVerify')
const remove = require('../controllers/user/delete')
const updatePreferences = require('../controllers/user/updatePreferences')
const updateEmailVerify = require('../controllers/user/updateEmailVerify')
const updateEmail = require('../controllers/user/updateEmail')

const auth = require('../middleware/auth')

router.post('/login', login)
router.post('/signup', signup)
router.post('/signup/verify', signupVerify)
router.post('/change-password', auth, changePass)
router.post('/forgot-password', forgotPass)
router.post('/forgot-password/verify', forgotPassVerify)
router.post('/email/verify', auth, updateEmailVerify)
router.post('/logout', auth, async (req, res) => {
    res.clearCookie('myCookie')
    return res.status(200).json({
        success: true,
        message: 'successfully logged out.'
    })
})

router.get('/', auth, (req, res) => {
    const {name, email, colorPreference} = req.user
    return res.status(200).json({
        success: true,
        message: 'Successfully retreived user profile data.',
        data: {
            name,
            email,
            colorPreference,
        }
    })
})

router.patch('/preferences', auth, updatePreferences)
router.patch('/email', auth, updateEmail)

router.delete('/', auth, remove)

module.exports = router