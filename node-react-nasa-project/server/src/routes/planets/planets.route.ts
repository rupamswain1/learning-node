import express from 'express'
import { httpGetAllPlanets } from './planets.controller'
const getPlanetRouter = express.Router()

getPlanetRouter.get('/planets', httpGetAllPlanets)

export default getPlanetRouter
