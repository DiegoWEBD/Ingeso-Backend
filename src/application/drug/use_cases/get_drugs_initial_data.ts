import DrugRepository from '../../../domain/drug/DrugRepository'
import DrugInitialData from '../DrugInitialData'

export const makeGetDrugsInitialData = (drugRepository: DrugRepository) => {
	return async (userEmail: string): Promise<Array<DrugInitialData>> => {
		const drugsInitialData = await drugRepository.getDrugsInitialData(
			userEmail
		)

		return drugsInitialData
	}
}
