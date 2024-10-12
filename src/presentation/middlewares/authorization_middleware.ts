import { NextFunction, Request, Response } from 'express'

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization !== 'authorized') {
    res.status(403).json({
      message: 'Debes estar autenticado.',
    })
    return
  }

  next()
}
