export default class DrugType {
	constructor(private dtype: string, private description: string) {}

	getDtype(): string {
		return this.dtype
	}

	getDescription(): string {
		return this.description
	}
}
