const express = require('express')
const fileRoute = express.Router()

const { getFile } = require('../controllers/getFiles.cotroller')

fileRoute.get('/', getFile)

module.exports = { fileRoute }
