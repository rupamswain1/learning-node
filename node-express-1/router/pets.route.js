const express = require('express')
const petRouter = express.Router()

const { getPets, getPetById } = require('../controllers/getPets.controller')
const { postPet } = require('../controllers/postPets.controller')

petRouter.get('/', getPets)

petRouter.get('/:petId', getPetById)

petRouter.post('/', postPet)

module.exports = { petRouter }
