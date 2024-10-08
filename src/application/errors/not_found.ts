export default class NotFoundError extends Error {
	constructor(message: string = 'El recurso no existe.') {
		super(message)
	}
}
