import { Router } from 'express'
import IUserServices from '../../application/user/IUserServices'
import { makeUserRequestHandler } from './user_request_handler'
import { makeController } from '../http/controller'

export const makeUserRouter = (userServices: IUserServices): Router => {
	const requestHandler = makeUserRequestHandler(userServices)
	const userController = makeController(requestHandler)

	const router = Router()

	router.get('/', userController)

	return router
}
