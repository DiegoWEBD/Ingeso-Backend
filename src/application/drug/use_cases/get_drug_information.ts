import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import NotFoundError from '../../errors/not_found'

export const makeGetDrugInformation = (drugRepository: DrugRepository) => {
	return async (name: string): Promise<Drug> => {
		const drug = await drugRepository.findByName(name)

		if (drug === undefined) {
			throw new NotFoundError(`El fármaco ${name} no está registrado.`)
		}

		return drug
	}
}
