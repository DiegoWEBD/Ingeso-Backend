import { Router } from 'express'
import RequestHandler from '../../http/request_handler'
import { makeRefreshTokenRequestHandler } from './refresh_token_request_handler'
import { Controller, makeController } from '../../http/controller'
import IUserServices from '../../../application/user/IUserServices'

export const makeRefreshTokenRouter = (userServices: IUserServices): Router => {
	const router = Router()
	const requestHandler: RequestHandler =
		makeRefreshTokenRequestHandler(userServices)
	const refreshTokenController: Controller = makeController(requestHandler)

	router.post('/', refreshTokenController)

	return router
}
