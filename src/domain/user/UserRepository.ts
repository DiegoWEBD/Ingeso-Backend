import User from './User'

export default interface UserRepository {
	add: (user: User) => Promise<void>
	findByInstitutionalEmail: (institutionalEmail: string) => Promise<User | null>
	getUserRefreshToken: (user: User) => Promise<string | null>
	registerRefreshToken: (
		user: User,
		refreshToken: string,
		expirationDate: Date
	) => Promise<void>

	addFavorite(drugName: string, userEmail: string): Promise<void>
	removeFavorite(drugName: string, userEmail: string): Promise<void>
	isFavorite(drugName: string, userEmail: string): Promise<boolean>

	addAllowedTeacher(teacherEmail: string): Promise<void>
	removeAllowedTeacher(teacherEmail: string): Promise<void>

	checkTeacherAllowed(teacherEmail: string): Promise<boolean>
}
