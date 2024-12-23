import { Student } from '../../domain/student/Student'
import Teacher from '../../domain/teacher/Teacher'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import Database from '../../presentation/database/Database'

export default class PostgresUserRepository implements UserRepository {
	constructor(private database: Database) {}

	async add(user: User): Promise<void> {
		await this.database.execute(
			'insert into app_user (institutional_email, name) values ($1, $2)',
			[user.getInstitutionalEmail(), user.getName()]
		)

		if (user instanceof Teacher) {
			await this.database.execute(
				'insert into teacher (institutional_email) values ($1)',
				[user.getInstitutionalEmail()]
			)
		} else if (user instanceof Student) {
			await this.database.execute(
				'insert into student (institutional_email) values ($1)',
				[user.getInstitutionalEmail()]
			)
		}
	}

	async findByInstitutionalEmail(
		institutionalEmail: string
	): Promise<User | null> {
		let userData: any | null = await this.database.queryOne(
			'select t.institutional_email, au.name from teacher t inner join app_user au on t.institutional_email = au.institutional_email where t.institutional_email = $1',
			[institutionalEmail]
		)

		if (userData !== null) {
			return new Teacher(userData.name, institutionalEmail)
		}

		userData = await this.database.queryOne(
			'select s.institutional_email, au.name from student s inner join app_user au on s.institutional_email = au.institutional_email where s.institutional_email = $1',
			[institutionalEmail]
		)

		return userData !== null
			? new Student(userData.name, institutionalEmail)
			: null
	}

	async getUserRefreshToken(user: User): Promise<string | null> {
		const refreshToken: any | null = await this.database.queryOne(
			'select * from refresh_token rt where rt.user_institutional_email = $1',
			[user.getInstitutionalEmail()]
		)

		return refreshToken === null ? null : refreshToken.token
	}

	async registerRefreshToken(
		user: User,
		refreshToken: string,
		expirationDate: Date
	): Promise<void> {
		await this.database.execute(
			'delete from refresh_token rt where rt.user_institutional_email = $1',
			[user.getInstitutionalEmail()]
		)

		await this.database.execute(
			'insert into refresh_token(user_institutional_email, token, expires_at) values ($1, $2, $3)',
			[
				user.getInstitutionalEmail(),
				refreshToken,
				expirationDate.toISOString(),
			]
		)
	}

	async addFavorite(drugName: string, userEmail: string): Promise<void> {
		const query = `
            INSERT INTO favorite_drug (drug_name, user_institutional_email)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
        `
		await this.database.execute(query, [drugName, userEmail])
	}

	async removeFavorite(drugName: string, userEmail: string): Promise<void> {
		const query = `
            DELETE FROM favorite_drug
            WHERE drug_name = $1 AND user_institutional_email = $2
        `
		await this.database.execute(query, [drugName, userEmail])
	}

	async isFavorite(drugName: string, userEmail: string): Promise<boolean> {
		const query = `
            SELECT 1 FROM favorite_drug
            WHERE drug_name = $1 AND user_institutional_email = $2
        `
		const result = await this.database.queryOne(query, [
			drugName,
			userEmail,
		])
		return result.rowCount > 0
	}

	async addAllowedTeacher(teacherEmail: string): Promise<void> {
		const query = `
			INSERT INTO allowed_teacher (institutional_email)
			VALUES ($1)
			ON CONFLICT DO NOTHING
		`

		await this.database.execute(query, [teacherEmail])
	}

	async removeAllowedTeacher(teacherEmail: string): Promise<void> {
		const query = `
			DELETE FROM allowed_teacher
			WHERE institutional_email = $1
		`
		await this.database.execute(query, [teacherEmail])
	}

	async checkTeacherAllowed(teacherEmail: string): Promise<boolean> {
		const query = `
			SELECT 1 FROM allowed_teacher
			WHERE institutional_email = $1
		`
		const result = await this.database.queryOne(query, [teacherEmail])
		//console.log('Resultado de checkTeacherAllowed:', result)
		return result !== null
	}
}
