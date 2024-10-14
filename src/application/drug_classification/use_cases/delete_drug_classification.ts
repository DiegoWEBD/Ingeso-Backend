import DrugClassification from '../../../domain/drug_classification/DrugClassification'
import DrugClassificationRepository from '../../../domain/drug_classification/DrugClassificationRepository'
import NotFoundError from '../../errors/not_found'

export const makeDeleteDrugClassification = (
	drugClassificationRepository: DrugClassificationRepository
) => {
	return async (classification: string): Promise<DrugClassification> => {
		const drugClassification =
			await drugClassificationRepository.findByClassification(classification)

		if (drugClassification === null) {
			throw new NotFoundError(
				`La clasificación que intenta eliminar (${classification}) no está registrada.`
			)
		}

		await drugClassificationRepository.delete(drugClassification)
		return drugClassification
	}
}
