import express from 'express'
import getPlanetRouter from './planets/planets.route'
import { launchRouter } from './launches/launches.route'
const api = express.Router()

api.use(getPlanetRouter)
api.use('/launches', launchRouter)

export default api
