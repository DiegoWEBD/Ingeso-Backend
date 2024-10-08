import AdverseReaction from '../../../domain/adverse_reaction/AdverseReaction'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import AlreadyExistsError from '../../errors/already_exists'
import NotFoundError from '../../errors/not_found'

export const makeAddAdverseReactionBetweenDrugs = (
	drugRepository: DrugRepository
) => {
	const adverseReactionAlreadyExists = (drug1: Drug, drug2: Drug): boolean => {
		const existingAverseReactions = drug1.getAdverseReactions()

		for (let adverseReaction of existingAverseReactions) {
			if (
				adverseReaction.getDrug1().getName() === drug1.getName() ||
				adverseReaction.getDrug2().getName() === drug2.getName()
			) {
				return true
			}
		}

		return false
	}

	// Caso de uso
	return async (
		drugName1: string,
		drugName2: string
	): Promise<[Drug, Drug]> => {
		const drug1 = await drugRepository.findByName(drugName1)

		if (drug1 === undefined) {
			throw new NotFoundError(`El fármaco '${drugName1}' no está registrado.`)
		}

		const drug2 = await drugRepository.findByName(drugName1)

		if (drug2 === undefined) {
			throw new NotFoundError(`El fármaco '${drugName2}' no está registrado.`)
		}

		if (adverseReactionAlreadyExists(drug1, drug2)) {
			throw new AlreadyExistsError(
				`La reacción adversa entre el fármaco '${drugName1}' y '${drugName2}' ya está registrada.`
			)
		}

		const adverseReaction = new AdverseReaction(drug1, drug2)
		drug1.getAdverseReactions().push(adverseReaction)
		drug2.getAdverseReactions().push(adverseReaction)

		await drugRepository.update(drugName1, drug1)
		await drugRepository.update(drugName2, drug2)

		return [drug1, drug2]
	}
}
