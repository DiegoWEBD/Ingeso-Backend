export const makeGetEmailRole = () => {
	return (institutionalEmail: string): string | undefined => {
		const temporalWhitelist = new Set<string>([
			'diego.maldonado.1alsf@gmail.com',
		])

		if (temporalWhitelist.has(institutionalEmail)) return 'teacher'

		const domain = institutionalEmail.split('@')[1]

		if (domain === 'alumnos.ucn.cl') return 'student'
		if (domain === 'ucn.cl' || domain === 'ce.ucn.cl') return 'teacher'

		return undefined
	}
}
