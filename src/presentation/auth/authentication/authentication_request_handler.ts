import { Request } from 'express'
import RequestHandler from '../../http/request_handler'
import { HttpResponse, makeHttpResponse } from '../../http/http_response'
import HttpError from '../../http/http_error'

export const makeAuthenticationRequestHandler = (): RequestHandler => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				console.log(request.body.refresh_token)

				return makeHttpResponse(200, {
					message: 'Nuevo access_token generado correctamente.',
					access_token: '',
				})
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
