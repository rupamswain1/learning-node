import { Request, Response } from 'express'

import { planets } from '../../models/planets.model'

export const getAllPlanets = (req: Request, res: Response) => {
  return res.status(200).json(planets)
}
