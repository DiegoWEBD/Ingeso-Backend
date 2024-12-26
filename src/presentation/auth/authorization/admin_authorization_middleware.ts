import { NextFunction, Response } from 'express'
import Teacher from '../../../domain/teacher/Teacher'
import { Middleware } from '../../http/middleware'
import RequestWithUser from '../../http/types/RequestWithUser'

export const adminAuthorizationMiddleware: Middleware = (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	const ADMIN_EMAIL = process.env.ADMIN_EMAIL

	if (!ADMIN_EMAIL) {
		res.status(500).json({
			message:
				'Debe definir el correo del administrador en la variable de entorno ADMIN_EMAIL.',
		})
		return
	}

	if (req.user?.getInstitutionalEmail() === ADMIN_EMAIL) {
		next()
		return
	}
	res.status(401).json({
		message:
			'Solamente el administrador de la página puede realizar esta acción.',
	})
	return
}
