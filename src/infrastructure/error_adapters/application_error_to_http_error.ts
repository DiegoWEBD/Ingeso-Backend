import AlreadyExistsError from '../../application/errors/already_exists'
import ApplicationError from '../../application/errors/application_error'
import NotFoundError from '../../application/errors/not_found'
import UnauthorizedError from '../../application/errors/unauthorized'
import HttpError from '../../presentation/http/http_error'

export const applicationErrorToHttpError = (
	applicationError: Error | ApplicationError
): HttpError => {
	if (applicationError instanceof NotFoundError)
		return new HttpError(404, applicationError.message)

	if (applicationError instanceof AlreadyExistsError)
		return new HttpError(409, applicationError.message)

	if (applicationError instanceof UnauthorizedError)
		return new HttpError(401, applicationError.message)

	return new HttpError(500, applicationError.message)
}
