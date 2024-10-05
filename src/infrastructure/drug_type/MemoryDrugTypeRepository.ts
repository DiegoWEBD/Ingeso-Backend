import DrugType from '../../domain/drug_type/DrugType'
import DrugTypeRepository from '../../domain/drug_type/DrugTypeRepository'

export default class MemoryDrugTypeRepository implements DrugTypeRepository {
	private static drugTypes: DrugType[]

	constructor() {
		if (MemoryDrugTypeRepository.drugTypes) {
			throw new Error('Cannot instantiate this repository more than once.')
		}

		MemoryDrugTypeRepository.drugTypes = []
	}

	async add(drugType: DrugType) {
		MemoryDrugTypeRepository.drugTypes.push(drugType)
	}

	async getAll(): Promise<DrugType[]> {
		return MemoryDrugTypeRepository.drugTypes
	}

	async findByType(dtype: string): Promise<DrugType | undefined> {
		return MemoryDrugTypeRepository.drugTypes.find(
			(drugType) => drugType.getDtype() === dtype
		)
	}

	async update(dtype: string, newValues: DrugType) {
		MemoryDrugTypeRepository.drugTypes.map((drugType) => {
			if (drugType.getDtype() !== dtype) return drugType
			return newValues
		})
	}

	async delete(drugType: DrugType) {
		MemoryDrugTypeRepository.drugTypes.filter(
			(dType) => dType.getDtype() !== drugType.getDtype()
		)
	}
}
