import DrugType from '../../../domain/drug_classification/DrugClassification'
import DrugTypeRepository from '../../../domain/drug_classification/DrugClassificationRepository'

export const makeGetDrugTypes = (drugTypeRepository: DrugTypeRepository) => {
	return async (): Promise<Array<DrugType>> => await drugTypeRepository.getAll()
}
