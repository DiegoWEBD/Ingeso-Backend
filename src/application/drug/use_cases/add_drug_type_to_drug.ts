import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import DrugTypeRepository from '../../../domain/drug_classification/DrugClassificationRepository'
import AlreadyExistsError from '../../errors/already_exists'
import NotFoundError from '../../errors/not_found'

export const makeAddDrugTypeToDrug = (
	drugRepository: DrugRepository,
	drugTypeRepository: DrugTypeRepository
) => {
	return async (drugName: string, dtype: string): Promise<Drug> => {
		const drugType = await drugTypeRepository.findByType(dtype)

		if (drugType === undefined) {
			throw new NotFoundError(
				`El tipo de fármaco '${dtype}' no está registrado.`
			)
		}

		const drug = await drugRepository.findByName(drugName)

		if (drug === undefined) {
			throw new NotFoundError(`El fármaco '${drugName}' no está registrado.`)
		}

		const drugTypes = drug.getDrugTypes()

		for (let drugType of drugTypes) {
			if (drugType.getDtype() === dtype) {
				throw new AlreadyExistsError(
					`La relación entre el fármaco '${drugName}' y el tipo de fármaco '${dtype}' ya está registrada.`
				)
			}
		}

		drug.getDrugTypes().push(drugType)
		await drugRepository.update(drugName, drug)

		return drug
	}
}
