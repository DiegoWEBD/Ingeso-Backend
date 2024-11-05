import { NextFunction, Response } from 'express'
import { Middleware } from '../http/middleware'
import RequestWithUser from '../http/types/RequestWithUser'
import Teacher from '../../domain/teacher/Teacher'

export const teacherAuthorizationMiddleware: Middleware = (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	if (req.user instanceof Teacher) {
		next()
	}
	res.status(401).json({
		message: 'Tu cuenta no tiene permisos para acceder a este recurso.',
	})
	return
}
