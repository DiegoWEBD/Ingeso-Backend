import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import DrugClassificationRepository from '../../../domain/drug_classification/DrugClassificationRepository'
import AlreadyExistsError from '../../errors/already_exists'
import NotFoundError from '../../errors/not_found'

export const makeAddClassificationToDrug = (
	drugRepository: DrugRepository,
	drugClassificationRepository: DrugClassificationRepository
) => {
	return async (drugName: string, classification: string): Promise<Drug> => {
		const drugClassification =
			await drugClassificationRepository.findByClassification(classification)

		if (drugClassification === null) {
			throw new NotFoundError(
				`La clasificación de fármaco '${classification}' no está registrada.`
			)
		}

		const drug = await drugRepository.findByName(drugName)

		if (drug === null) {
			throw new NotFoundError(`El fármaco '${drugName}' no está registrado.`)
		}

		const drugClassifications = drug.getDrugClassifications()

		for (let drugClassification of drugClassifications) {
			if (drugClassification.getClassification() === classification) {
				throw new AlreadyExistsError(
					`La relación entre el fármaco '${drugName}' y la clasificación '${classification}' ya está registrada.`
				)
			}
		}

		drug.getDrugClassifications().push(drugClassification)
		await drugRepository.update(drugName, drug)

		return drug
	}
}
