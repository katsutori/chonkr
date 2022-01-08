const express = require('express')
const asyncHandler = require('express-async-handler')

const { Photo } = require('../../db/models')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
    const response = await Photo.findAll();
    res.json(response)
}))

module.exports = router
