import { NextFunction, Request, Response } from 'express'
import IUserServices from '../../../application/user/IUserServices'
import { Middleware } from '../../http/middleware'
import jwt from 'jsonwebtoken'
import RequestWithUser from '../../http/types/RequestWithUser'

export const makeAuthenticationMiddleware = (
	userServices: IUserServices
): Middleware => {
	return (req: RequestWithUser, res: Response, next: NextFunction): void => {
		const accessToken = req.headers.authorization
		console.log(accessToken)

		if (!accessToken) {
			res.status(401).json({
				message: 'No tienes permisos para acceder a este recurso.',
			})
			return
		}

		let payload: any

		try {
			payload = jwt.verify(
				accessToken.split(' ')[1],
				process.env.JWT_SECRET as string
			)
		} catch (error) {
			res.status(401).json({
				message: 'No tienes permisos para acceder a este recurso.',
				error,
			})
			return
		}

		userServices
			.getUser(payload.email)
			.then((user) => {
				req.user = user
				next()
			})
			.catch((error) => {
				res
					.status(500)
					.json({ message: 'Error al obtener la sesión del usuario.', error })
			})
	}
}
