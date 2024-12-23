import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'

export const makeFindDrug = (drugRepository: DrugRepository) => {
	return async (name: string): Promise<Drug | null> => {
		return await drugRepository.findByName(name)
	}
}
