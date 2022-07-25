import { Request, Response, NextFunction } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const isLoggedIn = true
  if (isLoggedIn) {
    next()
  } else {
    res.status(401).json({ message: 'You must login' })
  }
}
