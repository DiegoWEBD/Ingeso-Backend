export default class AdministrationProcedure {
	constructor(private method: string, private procedure: string) {}

	getMethod(): string {
		return this.method
	}

	getProcedure(): string {
		return this.procedure
	}
}
