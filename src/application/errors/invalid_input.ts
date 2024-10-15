import ApplicationError from './application_error'

export default class InvalidInputError extends ApplicationError {
	constructor(message: string = 'INput de usuario inválido.') {
		super(message)
	}
}
