import ApplicationError from './application_error'

export default class AlreadyExistsError extends ApplicationError {
	constructor(message: string = 'El recurso ya existe.') {
		super(message)
	}
}
