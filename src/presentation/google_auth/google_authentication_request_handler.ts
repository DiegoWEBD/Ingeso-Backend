import axios from 'axios'
import IUserServices from '../../application/user/IUserServices'
import UserAdapter from '../../infrastructure/user/adapter/UserAdapter'
import { generateAccessToken } from '../auth/jwt/generate_access_token'
import HttpError from '../http/http_error'
import { HttpResponse, makeHttpResponse } from '../http/http_response'
import RequestHandler from '../http/request_handler'
import RequestWithUser from '../http/types/RequestWithUser'

export const makeGoogleAuthenticationRequestHandler = (
	userServices: IUserServices
): RequestHandler => {
	const isInstitutionalEmail = (email: string): boolean => {
		const domain = email.split('@')[1]

		return (
			domain === 'ucn.cl' ||
			domain === 'alumnos.ucn.cl' ||
			domain === 'ce.ucn.cl'
		)
	}

	return async (request: RequestWithUser): Promise<HttpResponse> => {
		switch (request.method) {
			case 'POST': {
				const userGoogleAccessToken = request.body.google_access_token

				const googleTokenResponse = await axios.get(
					`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${userGoogleAccessToken}`
				)

				if (googleTokenResponse.data.aud !== process.env.GOOGLE_CLIENT_ID) {
					throw new HttpError(401, 'Token de google inválido.')
				}

				const userInfoResponse = await axios.get(
					'https://www.googleapis.com/oauth2/v3/userinfo',
					{
						headers: {
							Authorization: `${request.body.token_type} ${userGoogleAccessToken}`,
						},
					}
				)

				const { name, email } = userInfoResponse.data

				if (!isInstitutionalEmail(email)) {
					throw new HttpError(
						401,
						'Correo inválido, ingrese con su correo institucional UCN.'
					)
				}

				let user = await userServices.findUser(email)

				if (user !== null) {
					const accessToken = generateAccessToken({
						name: user.getName(),
						email: user.getInstitutionalEmail(),
					})

					const refreshToken = await userServices.generateUserRefreshToken(
						user.getInstitutionalEmail()
					)

					return makeHttpResponse(200, {
						message: 'Inicio de sesión exitoso.',
						access_token: accessToken,
						refresh_token: refreshToken,
						user: UserAdapter.ToJSON(user),
					})
				}

				user = await userServices.registerStudent(email, name)

				const accessToken = generateAccessToken({
					name: user.getName(),
					email: user.getInstitutionalEmail(),
				})

				const refreshToken = await userServices.generateUserRefreshToken(
					user.getInstitutionalEmail()
				)

				return makeHttpResponse(201, {
					message: 'Estudiante registrado.',
					access_token: accessToken,
					refresh_token: refreshToken,
					user: UserAdapter.ToJSON(user),
				})
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
