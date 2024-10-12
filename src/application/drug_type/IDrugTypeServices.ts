import DrugType from '../../domain/drug_classification/DrugClassification'

export default interface IDrugTypeServices {
	getDrugTypes: () => Promise<Array<DrugType>>
	registerDrugType: (dtype: string, description: string) => Promise<DrugType>
}
