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
    const { userId, title, url, description, dateTaken } = req.body
    const response = await Photo.create({
        userId,
        title,
        url,
        description,
        dateTaken
    })
    res.json(response)
}))

router.patch('/:id', asyncHandler(async (req, res) => {
    const choicePhoto = await Photo.findByPk(req.params.id)
    const { title, description, dateTaken } = req.body
    console.log('-------------------', choicePhoto)
    if (choicePhoto) {
        await choicePhoto.update({
            title,
            description,
            dateTaken
        })
    }
    const updatedPhoto = await Photo.findByPk(req.params.id)
    return res.json(updatedPhoto)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const removed = await Photo.findByPk(req.params.id)
    if (removed) {
        await removed.destroy()
    }
    return res.json(removed)
}))

module.exports = router
