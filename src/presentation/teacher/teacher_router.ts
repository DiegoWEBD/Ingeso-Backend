import { Router, Response, NextFunction } from 'express'
import IUserServices from '../../application/user/IUserServices'
import RequestWithUser from '../http/types/RequestWithUser'

export const makeAllowedTeacherRouter = (
	userServices: IUserServices
): Router => {
	const router = Router()

	// Endpoint para permitir docentes
	router.post(
		'/allowed',
		async (req: RequestWithUser, res: Response, next: NextFunction) => {
			try {
				const teacherEmail = req.body.teacherEmail

				await userServices.addAllowedTeacher(teacherEmail)
			} catch (error) {
				next(error)
			}
		}
	)

	router.delete(
		'/allowed/:teacherEmail',
		async (req: RequestWithUser, res: Response, next: NextFunction) => {
			try {
				const teacherEmail = req.params.teacherEmail

				await userServices.removeAllowedTeacher(teacherEmail)
				res.status(200).json({
					message: `Docente con correo ${teacherEmail} eliminado.`,
				})
			} catch (error) {
				next(error)
			}
		}
	)

	return router
}
