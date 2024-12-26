import { Router } from 'express'
import IUserServices from '../../application/user/IUserServices'
import { makeController } from '../http/controller'
import { makeTeacherRequestHandler } from './teacher_request_handler'
import { adminAuthorizationMiddleware } from '../auth/authorization/admin_authorization_middleware'

export const makeAllowedTeacherRouter = (
	userServices: IUserServices
): Router => {
	const router = Router()
	const requestHandler = makeTeacherRequestHandler(userServices)
	const allowedTeacherController = makeController(requestHandler)

	// Endpoint para permitir docentes
	router.post(
		'/allowed',
		adminAuthorizationMiddleware,
		allowedTeacherController
	)
	router.delete(
		'/allowed/:teacherEmail',
		adminAuthorizationMiddleware,
		allowedTeacherController
	)

	return router
}
