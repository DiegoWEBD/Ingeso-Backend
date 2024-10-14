import DrugClassification from '../../domain/drug_classification/DrugClassification'

export default interface IDrugTypeServices {
	registerDrugClassification: (
		classification: string,
		description: string
	) => Promise<DrugClassification>
	deleteDrugClassification: (
		classification: string
	) => Promise<DrugClassification>
}
