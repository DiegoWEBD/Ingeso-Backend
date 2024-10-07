import DrugType from './DrugType'

export default interface DrugTypeRepository {
	add: (drugType: DrugType) => Promise<void>
	getAll: () => Promise<DrugType[]>
	findByType: (dtype: string) => Promise<DrugType | undefined>
	update: (dtype: string, newValues: DrugType) => Promise<void>
	delete: (drugType: DrugType) => Promise<void>
}
