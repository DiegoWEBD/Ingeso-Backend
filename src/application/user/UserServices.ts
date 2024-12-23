import { Student } from '../../domain/student/Student'
import Teacher from '../../domain/teacher/Teacher'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import IUserServices from './IUserServices'
import { makeFindUser } from './use_cases/find_user'
import { makeGenerateUserRefreshToken } from './use_cases/generate_user_refresh_token'
import { makeGetEmailRole } from './use_cases/get_email_role'
import { makeGetUser } from './use_cases/get_user'
import { makeRegisterStudent } from './use_cases/register_student'
import { makeRegisterTeacher } from './use_cases/register_teacher'
import { makeVerifyUserRefreshToken } from './use_cases/verify_user_refresh_token'

import createHttpError from 'http-errors'

export default class UserServices implements IUserServices {
	constructor(private userRepository: UserRepository) {}

	registerStudent: (
		institutionalEmail: string,
		name: string
	) => Promise<Student> = makeRegisterStudent(this.userRepository)

	registerTeacher: (
		institutionalEmail: string,
		name: string
	) => Promise<Teacher> = makeRegisterTeacher(this.userRepository)

	getUser: (institutionalEmail: string) => Promise<User> = makeGetUser(
		this.userRepository
	)

	findUser: (institutionalEmail: string) => Promise<User | null> =
		makeFindUser(this.userRepository)

	verifyUserRefreshToken: (
		institutionalEmail: string,
		refreshToken: string
	) => Promise<void> = makeVerifyUserRefreshToken(this.userRepository)

	getEmailRole: (institutionalEmail: string) => string | undefined =
		makeGetEmailRole()

	async addFavorite(drugName: string, userEmail: string): Promise<void> {
		await this.userRepository.addFavorite(drugName, userEmail)
	}

	async removeFavorite(drugName: string, userEmail: string): Promise<void> {
		await this.userRepository.removeFavorite(drugName, userEmail)
	}

	async isFavorite(drugName: string, userEmail: string): Promise<boolean> {
		return await this.userRepository.isFavorite(drugName, userEmail)
	}

	async addAllowedTeacher(teacherEmail: string): Promise<void> {
		const alreadyAllowed = await this.userRepository.checkTeacherAllowed(
			teacherEmail
		)
		if (alreadyAllowed) {
			// Docente ya está en la tabla => error 409
			console.log('El correo ya posee permisos')
			throw createHttpError(409, 'El correo ya posee permisos')
		}
		// Si NO está, agregarlo
		console.log('Agregando correo a la tabla')
		await this.userRepository.addAllowedTeacher(teacherEmail)
	}

	async removeAllowedTeacher(teacherEmail: string): Promise<void> {
		await this.userRepository.removeAllowedTeacher(teacherEmail)
	}

	async checkTeacherAllowed(teacherEmail: string): Promise<boolean> {
		return await this.userRepository.checkTeacherAllowed(teacherEmail)
	}

	generateUserRefreshToken: (institutionalEmail: string) => Promise<string> =
		makeGenerateUserRefreshToken(this.userRepository)
}
