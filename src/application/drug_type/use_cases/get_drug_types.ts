import DrugType from '../../../domain/drug_type/DrugType'
import DrugTypeRepository from '../../../domain/drug_type/DrugTypeRepository'

export const makeGetDrugTypes = (drugTypeRepository: DrugTypeRepository) => {
	return async (): Promise<Array<DrugType>> => await drugTypeRepository.getAll()
}
