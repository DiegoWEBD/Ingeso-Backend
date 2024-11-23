import { Request } from 'express'
import RequestHandler from '../../http/request_handler'
import { HttpResponse, makeHttpResponse } from '../../http/http_response'
import HttpError from '../../http/http_error'
import IUserServices from '../../../application/user/IUserServices'

export const makeRefreshTokenRequestHandler = (
	userServices: IUserServices
): RequestHandler => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'POST': {
				const refreshToken = request.headers.authorization
				const userEmail = request.body.institutional_email

				if (!userEmail) {
					throw new HttpError(400, 'Correo institucional no proporcionado.')
				}

				if (!refreshToken) {
					throw new HttpError(401, 'Refresh token no proporcionado.')
				}

				await userServices.verifyUserRefreshToken(userEmail, refreshToken)

				return makeHttpResponse(200, {
					message: 'Nuevo access token generado correctamente.',
					access_token: '',
				})
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
