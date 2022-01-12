const express = require('express')
const asyncHandler = require('express-async-handler')

const { check, validationResult } = require('express-validator')

const { Photo, Album, User, Join } = require('../../db/models')

const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    const { photoId, albumId } = req.body
    const response = await Join.create({
        photoId,
        albumId
    })

    res.json(response)
}))

module.exports = router