import { Request } from 'express'
import RequestHandler from '../../http/request_handler'
import { HttpResponse, makeHttpResponse } from '../../http/http_response'
import HttpError from '../../http/http_error'
import IUserServices from '../../../application/user/IUserServices'
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../jwt/generate_access_token'

export const makeRefreshTokenRequestHandler = (
	userServices: IUserServices
): RequestHandler => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				const refreshToken = request.headers.authorization

				if (!refreshToken) {
					throw new HttpError(401, 'Refresh token no proporcionado.')
				}
				const payload: any = jwt.verify(
					refreshToken.split(' ')[1],
					process.env.REFRESH_TOKEN_SECRET as string
				)

				await userServices.verifyUserRefreshToken(
					payload.email,
					refreshToken.split(' ')[1]
				)

				const newAccessToken = generateAccessToken({
					name: payload.name,
					email: payload.email,
				})

				return makeHttpResponse(200, {
					message: 'Nuevo access token generado correctamente.',
					access_token: newAccessToken,
				})
			}

			default: {
				throw new HttpError(
					405,
					`Método ${request.method} no permitido.`
				)
			}
		}
	}
}
