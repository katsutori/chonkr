const express = require('express')
const asyncHandler = require('express-async-handler')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const { Photo } = require('../../db/models')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
    const response = await Photo.findAll();
    res.json(response)
}))

router.post('/', asyncHandler(async (req, res) => {
    const { userId, url, description, dateTaken } = req.body
    const response = await Photo.create({
        userId,
        url,
        description,
        dateTaken
    })
    return res.redirect(`${req.baseUrl}/${response}`)
}))

module.exports = router