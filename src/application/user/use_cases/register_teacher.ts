import Teacher from '../../../domain/teacher/Teacher'
import User from '../../../domain/user/User'
import UserRepository from '../../../domain/user/UserRepository'
import AlreadyExistsError from '../../errors/already_exists'

export const makeRegisterTeacher = (userRepository: UserRepository) => {
	return async (institutionalEmail: string, name: string): Promise<Teacher> => {
		const existingUser: User | null =
			await userRepository.findByInstitutionalEmail(institutionalEmail)

		if (existingUser !== null) {
			throw new AlreadyExistsError(
				`El correo '${institutionalEmail}' ya está registrado.`
			)
		}

		const newTeacher = new Teacher(name, institutionalEmail)
		await userRepository.add(newTeacher)

		return newTeacher
	}
}
