import Teacher from './Teacher'

export default interface TeacherRepository {
	add: (teacher: Teacher) => Promise<void>
	getAll: () => Promise<Array<Teacher>>
	findByEmail: (email: string) => Promise<Teacher | undefined>
	update: (email: string, newValue: Teacher) => Promise<void>
	delete: (teacher: Teacher) => Promise<void>
}
