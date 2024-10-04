import User from '../user/User'

export default class Teacher extends User {
	constructor(protected name: string, protected institutionalEmail: string) {
		super(name, institutionalEmail)
	}
}
