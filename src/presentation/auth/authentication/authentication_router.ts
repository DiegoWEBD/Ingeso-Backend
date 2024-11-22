import { Router } from 'express'
import RequestHandler from '../../http/request_handler'
import { makeAuthenticationRequestHandler } from './authentication_request_handler'
import { Controller, makeController } from '../../http/controller'

export const makeAuthenticationRouter = (): Router => {
	const router = Router()
	const requestHandler: RequestHandler = makeAuthenticationRequestHandler()
	const authenticationController: Controller = makeController(requestHandler)

	router.get('/', authenticationController)

	return router
}
