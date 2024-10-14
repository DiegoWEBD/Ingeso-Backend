import DrugRepository from '../../../domain/drug/DrugRepository'

export const makeGetDrugsNames = (drugRepository: DrugRepository) => {
	return async (): Promise<string[]> => {
		const drugs = await drugRepository.getAll()
		return drugs.map((drug) => drug.getName())
	}
}
