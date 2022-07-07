import { Request, Response } from 'express'

import { getHabitablePlanets } from '../../models/planets.model'

export const httpGetAllPlanets = async (req: Request, res: Response) => {
  return res.status(200).json(await getHabitablePlanets())
}
