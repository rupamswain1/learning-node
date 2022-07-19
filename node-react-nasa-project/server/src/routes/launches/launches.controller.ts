import { Request, Response } from 'express'

import {
  getAllLaunches,
  scheduleNewLaunch,
  getLaunchByflightNumber,
  abortLaunch,
  getHistoricalLaunches,
  getUpcomingLaunches,
} from '../../models/launches.model'

interface pagination {
  page: number
  limit: number
}

export const httpGetAllLaunches = async (req: Request, res: Response) => {
  let { page, limit } = (req.query as unknown) as pagination
  page = Math.abs(+page) || 1
  limit = Math.abs(+limit) || 0
  const skip = Math.abs(limit * (page - 1))
  return res.status(200).json(await getAllLaunches({ skip, limit }))
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

    return res.status(201).json(await getAllLaunches({ skip: 0, limit: 0 }))
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const httpDeleteLaunch = async (req: Request, res: Response) => {
  const flightNumber = Number(req.params.flightNumber)
  let launch = await getLaunchByflightNumber(flightNumber)

  if (launch.length > 0) {
    console.log('inside if')
    const success = await abortLaunch(flightNumber)
    console.log(success)
    if (success) {
      return res.status(200).json(launch)
    } else {
      return res.status(500).json({ message: 'launch failed' })
    }
  }
  return res.status(400).json(`FlightNumber: ${flightNumber} is not found`)
}

export const httpGetHistoricalLaunch = async (req: Request, res: Response) => {
  const historicalLaunches = await getHistoricalLaunches()
  return res.status(200).json(historicalLaunches)
}

export const httpGetUpcomingLaunch = async (req: Request, res: Response) => {
  const upcomingLaunch = await getUpcomingLaunches()
  return res.status(200).json(upcomingLaunch)
}
