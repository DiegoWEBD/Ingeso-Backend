export default abstract class ApplicationError extends Error {
	constructor(message: string = 'El recurso ya existe.') {
		super(message)
	}
}
