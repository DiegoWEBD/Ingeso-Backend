import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import DrugClassification from '../../../domain/drug_classification/DrugClassification'
import DrugClassificationRepository from '../../../domain/drug_classification/DrugClassificationRepository'
import Ram from '../../../domain/ram/Ram'
import AlreadyExistsError from '../../errors/already_exists'
import NotFoundError from '../../errors/not_found'

export const makeRegisterDrug = (
	drugRepository: DrugRepository,
	drugClassificationRepository: DrugClassificationRepository
) => {
	return async (
		name: string,
		presentation: string,
		description: string,
		classifications: Array<string>,
		reactions: Array<string>,
		administrationMethodsWithProcedure: Map<string, string>
	): Promise<Drug> => {
		const existingDrug = await drugRepository.findByName(name)

		if (existingDrug !== undefined) {
			throw new AlreadyExistsError(`El fármaco '${name}' ya está registrado.`)
		}

		const drugClassifications: DrugClassification[] = []

		for (let classification of classifications) {
			const drugClassification =
				await drugClassificationRepository.findByClassification(classification)

			if (drugClassification === null) {
				throw new NotFoundError(
					`La clasificación '${classification}' no está registrada.`
				)
			}
			drugClassifications.push(drugClassification)
		}

		const administrationProcedures: Array<AdministrationProcedure> = []

		for (let methodProcedure of administrationMethodsWithProcedure) {
			const method = methodProcedure[0]
			const procedure = methodProcedure[1]

			const administrationProcedure = new AdministrationProcedure(
				method,
				procedure
			)
			administrationProcedures.push(administrationProcedure)
		}

		const rams: Array<Ram> = []

		for (let reaction of reactions) {
			rams.push(new Ram(reaction))
		}

		const newDrug = new Drug(
			name,
			presentation,
			description,
			drugClassifications,
			rams,
			administrationProcedures
		)

		await drugRepository.add(newDrug)

		return newDrug
	}
}
