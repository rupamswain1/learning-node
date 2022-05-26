import express from 'express'

import { getAllLaunches } from '../../routes/launches/launches.controller'

export const launchRouter = express.Router()

launchRouter.get('/launches', getAllLaunches)
