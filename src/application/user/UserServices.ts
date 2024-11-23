import { Student } from '../../domain/student/Student'
import Teacher from '../../domain/teacher/Teacher'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import IUserServices from './IUserServices'
import { makeFindUser } from './use_cases/find_user'
import { makeGenerateUserRefreshToken } from './use_cases/generate_user_refresh_token'
import { makeGetUser } from './use_cases/get_user'
import { makeRegisterStudent } from './use_cases/register_student'
import { makeRegisterTeacher } from './use_cases/register_teacher'
import { makeVerifyUserRefreshToken } from './use_cases/verify_user_refresh_token'

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

	findUser: (institutionalEmail: string) => Promise<User | null> = makeFindUser(
		this.userRepository
	)

	verifyUserRefreshToken: (
		institutionalEmail: string,
		refreshToken: string
	) => Promise<void> = makeVerifyUserRefreshToken(this.userRepository)

	generateUserRefreshToken: (institutionalEmail: string) => Promise<string> =
		makeGenerateUserRefreshToken(this.userRepository)
}
