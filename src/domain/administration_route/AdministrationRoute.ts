export default class AdministrationRoute {
	constructor(private route: string, private description: string) {}

	getRoute(): string {
		return this.route
	}

	getDescription(): string {
		return this.description
	}
}
