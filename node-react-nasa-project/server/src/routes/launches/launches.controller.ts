import { Request, Response } from 'express'

import { getAllLaunches, addNewLaunch } from '../../models/launches.model'

export const httpGetAllLaunches = (req: Request, res: Response) => {
  return res.status(200).json(getAllLaunches())
}

export const httpAddLaunch = (req: Request, res: Response) => {
  const launch = req.body
  launch.launchDate = new Date(launch.launchDate)
  addNewLaunch(launch)
  return res.status(201).json(getAllLaunches())
}
