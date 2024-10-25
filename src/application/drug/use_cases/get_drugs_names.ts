import DrugRepository from '../../../domain/drug/DrugRepository'

export const makeGetDrugsNames = (drugRepository: DrugRepository) => {
	return async (): Promise<string[]> => {
		return await drugRepository.getAllNames()
	}
}
