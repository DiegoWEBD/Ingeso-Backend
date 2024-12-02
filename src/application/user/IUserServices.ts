import { Student } from '../../domain/student/Student'
import Teacher from '../../domain/teacher/Teacher'
import User from '../../domain/user/User'

export default interface IUserServices {
	registerStudent: (
		institutionalEmail: string,
		name: string
	) => Promise<Student>

	registerTeacher: (
		institutionalEmail: string,
		name: string
	) => Promise<Teacher>

	getUser: (institutionalEmail: string) => Promise<User>

	findUser: (institutionalEmail: string) => Promise<User | null>

	verifyUserRefreshToken: (
		institutionalEmail: string,
		refreshToken: string
	) => Promise<void>

	generateUserRefreshToken: (institutionalEmail: string) => Promise<string>

	addFavorite(drugName: string, userEmail: string): Promise<void>;
    removeFavorite(drugName: string, userEmail: string): Promise<void>;
    isFavorite(drugName: string, userEmail: string): Promise<boolean>;
}
