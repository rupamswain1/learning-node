import { Request, Response } from 'express'

import { getAllLaunches, addNewLaunch } from '../../models/launches.model'

export const httpGetAllLaunches = (req: Request, res: Response) => {
  return res.status(200).json(getAllLaunches())
}

export const httpAddLaunch = (req: Request, res: Response) => {
  const launch = req.body

  if (
    !launch.misson ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination ||
    !launch.customer
  ) {
    return res.status(400).json({ error: 'invalid launch property' })
  }

  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: 'invalid launch date' })
  }
  addNewLaunch(launch)
  return res.status(201).json(getAllLaunches())
}
