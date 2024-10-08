import AdministrationRoute from '../../../domain/administration_route/AdministrationRoute'
import AdministrationRouteRepository from '../../../domain/administration_route/AdministrationRouteRepository'
import AlreadyExistsError from '../../errors/already_exists'

export const makeRegisterAdministrationRoute = (
	administrationRouteRepository: AdministrationRouteRepository
) => {
	return async (
		route: string,
		description: string
	): Promise<AdministrationRoute> => {
		const administrationRoute = await administrationRouteRepository.findByRoute(
			route
		)

		if (administrationRoute !== undefined) {
			throw new AlreadyExistsError(
				`La vía de administración '${route}' ya está registrada.`
			)
		}

		const newAdministrationRoute = new AdministrationRoute(route, description)
		await administrationRouteRepository.add(newAdministrationRoute)

		return newAdministrationRoute
	}
}
