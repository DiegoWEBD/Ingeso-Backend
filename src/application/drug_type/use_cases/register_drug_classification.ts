import DrugType from '../../../domain/drug_classification/DrugClassification'
import DrugClassificationRepository from '../../../domain/drug_classification/DrugClassificationRepository'
import AlreadyExistsError from '../../errors/already_exists'

export const makeRegisterDrugClassification = (
	drugClassificationRepository: DrugClassificationRepository
) => {
	return async (
		classification: string,
		description: string
	): Promise<DrugType> => {
		const drugType = await drugClassificationRepository.findByClassification(
			classification
		)

		if (drugType !== null) {
			throw new AlreadyExistsError(
				`La clasificación de fármaco '${classification}' ya está registrada.`
			)
		}

		const newDrugType = new DrugType(classification, description)
		await drugClassificationRepository.add(newDrugType)

		return newDrugType
	}
}
