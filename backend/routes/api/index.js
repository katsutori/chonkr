const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { User } = require('../../db/models')

// test middleware
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user)
// })

// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     })
//     setTokenCookie(res, user)
//     return res.json({ user })
// }))

// router.get('/restore-user', restoreUser, (req, res) => {
//     return res.json(req.user)
// })

router.get('/', (req,res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.send('Hello World')
})

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })

})

module.exports = router
