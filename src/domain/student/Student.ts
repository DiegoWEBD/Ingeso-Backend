import User from '../user/User'

export class Student extends User {
	constructor(protected name: string, protected institutionalEmail: string) {
		super(name, institutionalEmail)
	}
}
