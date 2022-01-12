const express = require('express')
const asyncHandler = require('express-async-handler')

const { check, validationResult } = require('express-validator')

const { User, Album } = require('../../db/models')

const router = express.Router()

router.get('/users/:id(\\d+)', asyncHandler(async (req, res) => {
    console.log('req params', req.params)
    const user = req.params.id
    console.log('---------------------', typeof +user)
    const response = await Album.findAll({
        where: {
            userId: +user,
        },
        include: [{model: User}]
    })
    res.json(response)
}))

module.exports = router
