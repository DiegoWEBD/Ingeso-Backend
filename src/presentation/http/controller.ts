import { Response } from 'express'
import ApplicationError from '../../application/errors/application_error'
import { applicationErrorToHttpError } from '../../infrastructure/error_adapters/application_error_to_http_error'
import HttpError from './http_error'
import { HttpResponse } from './http_response'
import RequestHandler from './request_handler'
import RequestWithUser from './types/RequestWithUser'

export type Controller = (request: RequestWithUser, response: Response) => void

export const makeController = (requestHandler: RequestHandler): Controller => {
	return (req: RequestWithUser, res: Response): void => {
		requestHandler(req)
			.then((httpResponse: HttpResponse) =>
				res.status(httpResponse.code).json(httpResponse.data)
			)
			.catch((error: Error | ApplicationError | HttpError) => {
				let httpError: HttpError =
					error instanceof HttpError
						? error
						: applicationErrorToHttpError(error)

				res.status(httpError.code).json({
					message: error.message,
				})
			})
	}
}
