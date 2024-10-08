import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import AdministrationRouteRepository from '../../../domain/administration_route/AdministrationRouteRepository'
import Drug from '../../../domain/drug/Drug'
import DrugRepository from '../../../domain/drug/DrugRepository'
import AlreadyExistsError from '../../errors/already_exists'
import NotFoundError from '../../errors/not_found'

export const makeAddDrugAdministrationRoute = (
	drugRepository: DrugRepository,
	administrationRouteRepository: AdministrationRouteRepository
) => {
	return async (
		drugName: string,
		route: string,
		procedure: string
	): Promise<Drug> => {
		const administrationRoute = await administrationRouteRepository.findByRoute(
			route
		)

		if (administrationRoute === undefined) {
			throw new NotFoundError(
				`La vía de administración '${route}' no está registrada.`
			)
		}

		const drug = await drugRepository.findByName(drugName)

		if (drug === undefined) {
			throw new NotFoundError(`El fármaco '${drugName}' no está registrado.`)
		}

		const drugAdministrationProcedures = drug.getAdministrationProcedures()

		for (let administrationProcedure of drugAdministrationProcedures) {
			if (
				administrationProcedure.getAdministrationRoute().getRoute() === route
			) {
				throw new AlreadyExistsError(
					`La vía de administración '${route}' ya está registrada para el fármaco '${drugName}'.`
				)
			}
		}

		const administrationProcedure = new AdministrationProcedure(
			administrationRoute,
			procedure
		)
		drug.getAdministrationProcedures().push(administrationProcedure)

		await drugRepository.update(drugName, drug)
		return drug
	}
}
