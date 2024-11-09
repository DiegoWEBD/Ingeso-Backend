import IUserServices from '../../application/user/IUserServices'
import User from '../../domain/user/User'
import UserAdapter from '../../infrastructure/user/adapter/UserAdapter'
import HttpError from '../http/http_error'
import { HttpResponse, makeHttpResponse } from '../http/http_response'
import RequestHandler from '../http/request_handler'
import RequestWithUser from '../http/types/RequestWithUser'

export const makeUserRequestHandler = (
	userServices: IUserServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				const loggedUser = request.user as User // en este punto el usuario es válido, ya que es una ruta protegida
				const user = await userServices.getUser(
					loggedUser.getInstitutionalEmail()
				)

				return makeHttpResponse(200, { user: UserAdapter.ToJSON(user) })
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
