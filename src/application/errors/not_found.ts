import ApplicationError from './application_error'

export default class NotFoundError extends ApplicationError {
	constructor(message: string = 'El recurso no existe.') {
		super(message)
	}
}
