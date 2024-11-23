export default class UnauthorizedError extends Error {
	constructor(message: string = 'No tienes permiso para acceder al recurso.') {
		super(message)
	}
}
