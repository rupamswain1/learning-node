import express from 'express'

import {
  httpGetAllLaunches,
  httpAddLaunch,
  httpDeleteLaunch,
  httpGetHistoricalLaunch,
  httpGetUpcomingLaunch,
} from '../../routes/launches/launches.controller'

export const launchRouter = express.Router()

launchRouter.get('/', httpGetAllLaunches)
launchRouter.post('/', httpAddLaunch)
launchRouter.delete('/:flightNumber', httpDeleteLaunch)
launchRouter.get('/history', httpGetHistoricalLaunch)
launchRouter.get('/upcoming', httpGetUpcomingLaunch)
