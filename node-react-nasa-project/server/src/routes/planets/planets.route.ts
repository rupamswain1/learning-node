import express from 'express'
import { getAllPlanets } from './planets.controller'
const getPlanetRouter = express.Router()

getPlanetRouter.get('/planets', getAllPlanets)

export default getPlanetRouter
