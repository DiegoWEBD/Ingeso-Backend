import { NextFunction, Response } from 'express'
import RequestWithUser from './types/RequestWithUser'

export type Middleware = (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => void
