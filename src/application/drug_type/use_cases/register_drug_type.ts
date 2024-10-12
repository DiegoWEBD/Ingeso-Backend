import DrugType from '../../../domain/drug_classification/DrugClassification'
import DrugTypeRepository from '../../../domain/drug_classification/DrugClassificationRepository'
import AlreadyExistsError from '../../errors/already_exists'

export const makeRegisterDrugType = (
	drugTypeRepository: DrugTypeRepository
) => {
	return async (dtype: string, description: string): Promise<DrugType> => {
		const drugType = await drugTypeRepository.findByType(dtype)

		if (drugType !== undefined) {
			throw new AlreadyExistsError(
				`El tipo de fármaco '${dtype}' ya está registrado.`
			)
		}

		const newDrugType = new DrugType(dtype, description)
		await drugTypeRepository.add(newDrugType)

		return newDrugType
	}
}
