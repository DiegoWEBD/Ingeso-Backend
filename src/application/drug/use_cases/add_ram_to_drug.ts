import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import Ram from '../../../domain/ram/Ram'
import AlreadyExistsError from '../../errors/already_exists'
import NotFoundError from '../../errors/not_found'

export const makeAddRamToDrug = (drugRepository: DrugRepository) => {
	return async (drugName: string, reaction: string): Promise<Drug> => {
		const drug = await drugRepository.findByName(drugName)

		if (drug === null) {
			throw new NotFoundError(`El fármaco '${drugName}' no está registrado.`)
		}

		const drugRams = drug.getRams()

		for (let ram of drugRams) {
			if (ram.getReaction() === reaction) {
				throw new AlreadyExistsError(
					`La RAM '${reaction}' ya está registrada para el fármaco '${drugName}'.`
				)
			}
		}

		drug.getRams().push(new Ram(reaction))
		await drugRepository.update(drugName, drug)

		return drug
	}
}
