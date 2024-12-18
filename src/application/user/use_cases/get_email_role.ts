export const makeGetEmailRole = () => {
	return (institutionalEmail: string): string | undefined => {
		const teacherWhiteList = new Set<string>([
			'diego.maldonado@alumnos.ucn.cl',
			'anibal.gonzalez@alumnos.ucn.cl',
			'sebastian.robles02@alumnos.ucn.cl',
			'matias.cortes09@alumnos.ucn.cl',
			'juan.orrego@alumnos.ucn.cl',
		])

		const studentWhiteList = new Set<string>([
			'diego.maldonado.1alsf@gmail.com',
			'anibal.gonzalez.lsf@gmail.com',
			'roblessebastian748@gmail.com',
		])

		if (teacherWhiteList.has(institutionalEmail)) return 'teacher'
		if (studentWhiteList.has(institutionalEmail)) return 'student'

		const domain = institutionalEmail.split('@')[1]

		if (domain === 'alumnos.ucn.cl') return 'student'
		if (domain === 'ucn.cl' || domain === 'ce.ucn.cl') return 'teacher'

		return undefined
	}
}
