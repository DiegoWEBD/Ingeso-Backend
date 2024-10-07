import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import AdministrationRouteRepository from '../../../domain/administration_route/AdministrationRouteRepository'
import AdverseReaction from '../../../domain/adverse_reaction/AdverseReaction'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import DrugType from '../../../domain/drug_type/DrugType'
import DrugTypeRepository from '../../../domain/drug_type/DrugTypeRepository'

export const makeRegisterDrug = (
	drugRepository: DrugRepository,
	drugTypeRepository: DrugTypeRepository,
	administrationRouteRepository: AdministrationRouteRepository
) => {
	return async (
		name: string,
		description: string,
		dtypes: string[],
		adverseReactionNames: string[],
		administrationRoutesWithProcedure: Map<string, string>
	): Promise<Drug> => {
		const existingDrug = await drugRepository.findByName(name)

		if (existingDrug !== undefined) {
			throw new Error(`El fármaco ${name} ya está registrado.`)
		}

		const drugTypes: DrugType[] = []

		for (let dtype of dtypes) {
			const drugType = await drugTypeRepository.findByType(dtype)

			if (drugType === undefined) {
				throw new Error(`El tipo de fármaco '${dtype} no está registrado.'`)
			}
			drugTypes.push(drugType)
		}

		const administrationProcedures: AdministrationProcedure[] = []

		for (let routeProcedure of administrationRoutesWithProcedure) {
			const route = routeProcedure[0]
			const administrationRoute =
				await administrationRouteRepository.findByRoute(route)

			if (administrationRoute === undefined) {
				throw new Error(`La vía de administración ${route} no está registrada.`)
			}

			const procedure = routeProcedure[1]
			const administrationProcedure = new AdministrationProcedure(
				administrationRoute,
				procedure
			)
			administrationProcedures.push(administrationProcedure)
		}

		const reactionDrugs: Drug[] = []

		for (let reactionDrugName of adverseReactionNames) {
			const drug = await drugRepository.findByName(reactionDrugName)

			if (drug === undefined) {
				throw new Error(`El fármaco ${reactionDrugName} no está registrado.`)
			}
			reactionDrugs.push(drug)
		}

		const newDrug = new Drug(
			name,
			description,
			drugTypes,
			[],
			administrationProcedures
		)

		for (let drug of reactionDrugs) {
			const adverseReaction = new AdverseReaction(newDrug, drug)
			drug.addAdverseReaction(adverseReaction)
			newDrug.addAdverseReaction(adverseReaction)
		}

		await drugRepository.add(newDrug)

		return newDrug
	}
}
