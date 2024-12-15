import axios from 'axios'
import IUserServices from '../../application/user/IUserServices'
import StudentJSONAdapter from '../../infrastructure/student/StudentJSONAdapter'
import TeacherJSONAdapter from '../../infrastructure/teacher/TeacherJSONAdapter'
import { generateAccessToken } from '../auth/jwt/generate_access_token'
import HttpError from '../http/http_error'
import { HttpResponse, makeHttpResponse } from '../http/http_response'
import RequestHandler from '../http/request_handler'
import RequestWithUser from '../http/types/RequestWithUser'

export const makeGoogleAuthenticationRequestHandler = (
	userServices: IUserServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		switch (request.method) {
			case 'POST': {
				const userGoogleAccessToken = request.body.google_access_token

				const googleTokenResponse = await axios.get(
					`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${userGoogleAccessToken}`
				)

				if (
					googleTokenResponse.data.aud !==
					process.env.GOOGLE_CLIENT_ID
				) {
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
				const emailRole = userServices.getEmailRole(email)

				if (!emailRole) {
					throw new HttpError(
						401,
						'Correo inválido, ingrese con su correo institucional UCN.'
					)
				}

				const userSelectedRole = request.body.role

				if (userSelectedRole !== emailRole) {
					throw new HttpError(
						403,
						'Tu correo institucional no tiene los permisos suficientes para crear una cuenta de este tipo'
					)
				}

				let user = await userServices.findUser(email)

				if (user !== null) {
					const accessToken = generateAccessToken({
						name: user.getName(),
						email: user.getInstitutionalEmail(),
					})

					const refreshToken =
						await userServices.generateUserRefreshToken(
							user.getInstitutionalEmail()
						)

					return makeHttpResponse(200, {
						message: 'Inicio de sesión exitoso.',
						access_token: accessToken,
						refresh_token: refreshToken,
						user:
							emailRole === 'teacher'
								? new TeacherJSONAdapter(user)
								: new StudentJSONAdapter(user),
					})
				}

				user =
					emailRole === 'teacher'
						? await userServices.registerTeacher(email, name)
						: await userServices.registerStudent(email, name)

				const accessToken = generateAccessToken({
					name: user.getName(),
					email: user.getInstitutionalEmail(),
				})

				const refreshToken =
					await userServices.generateUserRefreshToken(
						user.getInstitutionalEmail()
					)

				return makeHttpResponse(201, {
					message: 'Estudiante registrado.',
					access_token: accessToken,
					refresh_token: refreshToken,
					user:
						emailRole === 'teacher'
							? new TeacherJSONAdapter(user)
							: new StudentJSONAdapter(user),
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
