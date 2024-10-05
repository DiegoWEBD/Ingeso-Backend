import DrugType from '../../domain/drug_type/DrugType'

export default interface IDrugTypeServices {
	getDrugTypes: () => Promise<DrugType[]>
	registerDrugType: (dtype: string, description: string) => Promise<DrugType>
}
