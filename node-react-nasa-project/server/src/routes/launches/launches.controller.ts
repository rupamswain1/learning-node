import { Request, Response } from 'express'

import {
  getAllLaunches,
  addNewLaunch,
  getLaunchByFlightNumber,
  abortLaunch,
  getHistoricalLaunches,
  getUpcomingLaunches,
} from '../../models/launches.model'

export const httpGetAllLaunches = (req: Request, res: Response) => {
  return res.status(200).json(getAllLaunches())
}

export const httpAddLaunch = (req: Request, res: Response) => {
  const launch = req.body
  console.log(
    launch.mission,
    !launch.rocket,
    !launch.launchDate,
    !launch.destination,
  )
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
  addNewLaunch(launch)
  return res.status(201).json(getAllLaunches())
}

export const httpDeleteLaunch = (req: Request, res: Response) => {
  const flightNumber = Number(req.params.flightNumber)
  let launch = getLaunchByFlightNumber(flightNumber)

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
