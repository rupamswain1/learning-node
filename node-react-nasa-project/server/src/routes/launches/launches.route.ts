import express from 'express'

import {
  httpGetAllLaunches,
  httpAddLaunch,
} from '../../routes/launches/launches.controller'

export const launchRouter = express.Router()

launchRouter.get('/launches', httpGetAllLaunches)
launchRouter.post('/launches', httpAddLaunch)
