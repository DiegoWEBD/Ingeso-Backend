import DrugType from '../../domain/drug_type/DrugType'

export default interface IDrugTypeServices {
	getDrugTypes: () => Promise<Array<DrugType>>
	registerDrugType: (dtype: string, description: string) => Promise<DrugType>
}
