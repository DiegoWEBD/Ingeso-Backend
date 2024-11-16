import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import Ram from '../../../domain/ram/Ram'
import NotFoundError from '../../errors/not_found'

export const makeUpdateDrug = (drugRepository: DrugRepository) => {
	return async (
		name: string,
		newName?: string,
		newPresentation?: string,
		newDescription?: string,
		newReactions?: Array<string>,
		newAdministrationProcedures?: Map<string, string>
	): Promise<Drug> => {
		const existingDrug = await drugRepository.findByName(name)

		if (!existingDrug) {
			throw new NotFoundError(`Fármaco con nombre '${name}' no encontrado.`)
		}

		if (newName) existingDrug.setName(newName)
		if (newPresentation) existingDrug.setPresentation(newPresentation)
		if (newDescription) existingDrug.setDescription(newDescription)

		if (newReactions) {
			const rams: Ram[] = newReactions.map((reaction) => new Ram(reaction))
			existingDrug.setRams(rams)
		}

		if (newAdministrationProcedures) {
			const updatedAdministrationProcedures: AdministrationProcedure[] = []
			for (const [method, procedure] of newAdministrationProcedures) {
				updatedAdministrationProcedures.push(
					new AdministrationProcedure(method, procedure)
				)
			}
			existingDrug.setAdministrationProcedures(updatedAdministrationProcedures)
		}

		await drugRepository.update(name, existingDrug)

		return existingDrug
	}
}
