const express = require('express')
const router = express.Router()

const apiRouter = require('./api')

router.use('/api', apiRouter)

if (process.env.NODE_ENV === 'production') {
    const path = require('path')

    router.get('/', (req, res) => {
        res.cookie('XSFR-TOKEN', req.csrfToken())
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        )
    })

    router.use(express.static(path.resolve('../frontend/build')))

    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        return res.sendFile(__dirname, '../../frontend', 'build', 'index.html')
    })
}

if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', res.csrfToken())
        return res.json({})
    })
}

router.get('/hello/world', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.send('Hello World')
})

module.exports = router
