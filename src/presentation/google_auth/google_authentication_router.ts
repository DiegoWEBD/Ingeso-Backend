import { Router } from 'express'
import IUserServices from '../../application/user/IUserServices'
import { makeGoogleAuthenticationRequestHandler } from './google_authentication_request_handler'
import RequestHandler from '../http/request_handler'
import { Controller, makeController } from '../http/controller'

export const makeAuthenticationRouter = (
	userServices: IUserServices
): Router => {
	const requestHandler: RequestHandler =
		makeGoogleAuthenticationRequestHandler(userServices)
	const authenticationController: Controller = makeController(requestHandler)
	const router = Router()

	router.all('/', authenticationController)

	return router
}
