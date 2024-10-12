export default class DrugClassification {
	constructor(private classification: string, private description: string) {}

	getClassification(): string {
		return this.classification
	}

	getDescription(): string {
		return this.description
	}
}
