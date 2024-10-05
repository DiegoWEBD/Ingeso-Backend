import { Student } from './Student'

export default interface StudentRepository {
	add: (student: Student) => Promise<void>
	getAll: () => Promise<Array<Student>>
	findByEmail: (email: string) => Promise<Student | undefined>
	update: (email: string, newValues: Student) => Promise<void>
	delete: (student: Student) => Promise<void>
}
