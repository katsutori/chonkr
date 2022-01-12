const express = require('express')
const router = express.Router()

const sessionRouter = require('./session.js')
const userRouter = require('./users.js')
const photoRouter = require('./photos')
const albumRouter = require('./albums')
const joinRouter = require('./join')

const asyncHandler = require('express-async-handler')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { User } = require('../../db/models')

router.use('/session', sessionRouter)
router.use('/users', userRouter)
router.use('/photos', photoRouter)
router.use('/albums', albumRouter)
router.use('/join', joinRouter)

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


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })

})

module.exports = router
