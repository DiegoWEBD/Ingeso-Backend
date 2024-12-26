import UnauthorizedError from '../../application/errors/unauthorized'
import IUserServices from '../../application/user/IUserServices'
import HttpError from '../http/http_error'
import { HttpResponse, makeHttpResponse } from '../http/http_response'
import RequestHandler from '../http/request_handler'
import RequestWithUser from '../http/types/RequestWithUser'

export const makeTeacherRequestHandler = (
	userServices: IUserServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		switch (request.method) {
			case 'POST':
				if (!request.body.teacherEmail) {
					throw new HttpError(
						400,
						'Debe indicar el correo del docente.'
					)
				}

				await userServices.addAllowedTeacher(request.body.teacherEmail)

				return makeHttpResponse(201, {
					message: `Permiso otorgado a docente ${request.body.teacherEmail}`,
				})

			case 'DELETE':
				if (!request.params.teacherEmail) {
					throw new HttpError(
						400,
						'Debe indicar el correo del docente.'
					)
				}

				await userServices.removeAllowedTeacher(
					request.params.teacherEmail
				)

				return makeHttpResponse(200, {
					message: `Docente con correo ${request.params.teacherEmail} eliminado.`,
				})

			default: {
				throw new HttpError(
					405,
					`Método ${request.method} no permitido.`
				)
			}
		}
	}
}
