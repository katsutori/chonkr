const express = require('express')
const asyncHandler = require('express-async-handler')

const { check, validationResult } = require('express-validator')

const { User, Album, Photo, Join } = require('../../db/models')

const router = express.Router()

router.get('/users/:id(\\d+)', asyncHandler(async (req, res) => {
    const user = req.params.id
    const response = await Album.findAll({
        where: {
            userId: +user,
        },
        include: [{model: User}, {model: Join,
            include: Photo
        }],

    })
    res.json(response)
}))

router.post('/', asyncHandler(async (req, res) => {
    const { name, userId } = req.body
    const response = await Album.create({
        name,
        userId
    })

    res.json(response)

}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const removed = await Album.findByPk(req.params.id)
    if (removed) {
        await removed.destroy()
    }
    return res.json(removed)
}))

module.exports = router
