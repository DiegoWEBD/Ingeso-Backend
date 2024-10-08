import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import DrugTypeRepository from '../../../domain/drug_type/DrugTypeRepository'
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

		drug.getDrugTypes().push(drugType)
		await drugRepository.update(drugName, drug)

		return drug
	}
}
