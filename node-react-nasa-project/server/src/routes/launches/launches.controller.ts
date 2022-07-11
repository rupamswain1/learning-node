import { Request, Response } from 'express'

import {
  getAllLaunches,
  scheduleNewLaunch,
  getLaunchByflightNumber,
  abortLaunch,
  getHistoricalLaunches,
  getUpcomingLaunches,
} from '../../models/launches.model'

export const httpGetAllLaunches = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllLaunches())
}

export const httpAddLaunch = async (req: Request, res: Response) => {
  const launch = req.body

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({ error: 'invalid launch property', launch })
  }

  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: 'invalid launch date' })
  }
  try {
    await scheduleNewLaunch(launch)
    return res.status(201).json(await getAllLaunches())
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const httpDeleteLaunch = (req: Request, res: Response) => {
  const flightNumber = Number(req.params.flightNumber)
  let launch = getLaunchByflightNumber(flightNumber)

  if (launch.length > 0) {
    launch = abortLaunch(flightNumber)
    return res.status(200).json(launch)
  }
  return res.status(400).json(`FlightNumber: ${flightNumber} is not found`)
}

export const httpGetHistoricalLaunch = (req: Request, res: Response) => {
  const historicalLaunches = getHistoricalLaunches()
  return res.status(200).json(historicalLaunches)
}

export const httpGetUpcomingLaunch = (req: Request, res: Response) => {
  const upcomingLaunch = getUpcomingLaunches()
  return res.status(200).json(upcomingLaunch)
}
