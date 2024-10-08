export default class AlreadyExistsError extends Error {
	constructor(message: string = 'El recurso ya existe.') {
		super(message)
	}
}
