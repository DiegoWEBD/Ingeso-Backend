export default class User {
	constructor(private name: string, private institutionalEmail: string) {}

	getName(): string {
		return this.name
	}

	getInstitutionalEmail(): string {
		return this.institutionalEmail
	}
}
