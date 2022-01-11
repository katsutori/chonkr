const express = require('express')
const asyncHandler = require('express-async-handler')

const { check, validationResult } = require('express-validator')

const { Photo, User } = require('../../db/models')

const router = express.Router()

const validateUpload = [
    check('title')
        .exists({ checkFalsy: true})
        .isLength({min: 2})
        .withMessage('Your title needs to be more than two characters.'),
    check('url')
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage('You need to provide a valid url.'),
    check('description')
        .exists({ checkFalsy: true})
        .isLength({min: 3})
        .withMessage('You need to provide a better description for your Chonkr.'),
    check('dateTaken')
        .exists({ checkFalsy: true})
        .isDate()
        .withMessage('Real date, please.')
]

router.get('/', asyncHandler(async (req, res) => {
    const response = await Photo.findAll({
        order: [['updatedAt', 'DESC']],
        include: [{model: User}],

    });
    res.json(response)
}))

router.post('/', validateUpload, asyncHandler(async (req, res, next) => {
    const { userId, title, url, description, dateTaken } = req.body
    const validatorErrors = validationResult(req)
    if (validatorErrors.isEmpty()){
        const response = await Photo.create({
            userId,
            title,
            url,
            description,
            dateTaken
        })
        res.json(response)
    } else res.json(validatorErrors)
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
