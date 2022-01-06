const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.send('Hello World')
})

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })

})

module.exports = router
