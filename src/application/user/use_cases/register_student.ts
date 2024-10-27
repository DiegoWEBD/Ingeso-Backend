import { Student } from '../../../domain/student/Student'
import User from '../../../domain/user/User'
import UserRepository from '../../../domain/user/UserRepository'
import AlreadyExistsError from '../../errors/already_exists'

export const makeRegisterStudent = (userRepository: UserRepository) => {
	return async (institutionalEmail: string, name: string): Promise<Student> => {
		const existingUser: User | null =
			await userRepository.findByInstitutionalEmail(institutionalEmail)

		if (existingUser !== null) {
			throw new AlreadyExistsError(
				`El correo '${institutionalEmail}' ya está registrado.`
			)
		}

		const newStudent = new Student(name, institutionalEmail)
		await userRepository.add(newStudent)

		return newStudent
	}
}
