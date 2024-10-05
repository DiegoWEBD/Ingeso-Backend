import AdministrationRoute from '../../../domain/administration_route/AdministrationRoute'
import AdministrationRouteRepository from '../../../domain/administration_route/AdministrationRouteRepository'

export const makeGetAdministrationRoutes = (
	administrationRouteRepository: AdministrationRouteRepository
) => {
	return async (): Promise<AdministrationRoute[]> =>
		await administrationRouteRepository.getAll()
}
