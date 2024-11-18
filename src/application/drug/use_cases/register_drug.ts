import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import Ram from '../../../domain/ram/Ram'
import AlreadyExistsError from '../../errors/already_exists'

export const makeRegisterDrug = (drugRepository: DrugRepository) => {
	return async (
		name: string,
		presentation: string,
		description: string,
		reactions: Array<string>,
		administrationMethodsWithProcedure: Map<string, string>
	): Promise<Drug> => {
		const existingDrug = await drugRepository.findByName(name)

		if (existingDrug !== undefined) {
			throw new AlreadyExistsError(`El fármaco '${name}' ya está registrado.`)
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
			rams,
			administrationProcedures
		)

		await drugRepository.add(newDrug)

		return newDrug
	}
}
