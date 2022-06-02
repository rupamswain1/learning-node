import { Request, Response } from 'express'

import { getAllLaunches, addNewLaunch } from '../../models/launches.model'

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
