import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import NotFoundError from '../../errors/not_found'

export const makeDeleteDrug = (drugRepository: DrugRepository) => {
	return async (drugName: string): Promise<Drug> => {
		const drug = await drugRepository.findByName(drugName)

		if (drug === null) {
			throw new NotFoundError(`El fármaco '${drugName}' no está registrado.`)
		}

		await drugRepository.delete(drug)
		return drug
	}
}
