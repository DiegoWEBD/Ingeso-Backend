import DrugClassification from './DrugClassification'

export default interface DrugClassificationRepository {
	add: (drugClassification: DrugClassification) => Promise<void>
	getAll: () => Promise<Array<DrugClassification>>
	findByClassification: (
		classification: string
	) => Promise<DrugClassification | null>
	update: (
		classification: string,
		newValues: DrugClassification
	) => Promise<void>
	delete: (drugClassification: DrugClassification) => Promise<void>
}
