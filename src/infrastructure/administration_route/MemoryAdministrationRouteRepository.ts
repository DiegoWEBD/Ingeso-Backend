import AdministrationRoute from '../../domain/administration_route/AdministrationRoute'
import AdministrationRouteRepository from '../../domain/administration_route/AdministrationRouteRepository'

export default class MemoryAdministrationRouteRepository
	implements AdministrationRouteRepository
{
	private static administrationRoutes: AdministrationRoute[]

	constructor() {
		if (MemoryAdministrationRouteRepository.administrationRoutes) {
			throw new Error('Cannot instantiate this repository more than once.')
		}

		MemoryAdministrationRouteRepository.administrationRoutes = []
	}

	async add(administrationRoute: AdministrationRoute) {
		MemoryAdministrationRouteRepository.administrationRoutes.push(
			administrationRoute
		)
	}

	async getAll(): Promise<AdministrationRoute[]> {
		return MemoryAdministrationRouteRepository.administrationRoutes
	}

	async findByRoute(route: string): Promise<AdministrationRoute | undefined> {
		return MemoryAdministrationRouteRepository.administrationRoutes.find(
			(administrationRoute) => administrationRoute.getRoute() === route
		)
	}

	async update(route: string, newValues: AdministrationRoute) {
		MemoryAdministrationRouteRepository.administrationRoutes.map(
			(administrationRoute) => {
				if (administrationRoute.getRoute() !== route) return administrationRoute
				return newValues
			}
		)
	}

	async delete(administrationRoute: AdministrationRoute) {
		MemoryAdministrationRouteRepository.administrationRoutes.filter(
			(ar) => ar.getRoute() !== administrationRoute.getRoute()
		)
	}
}
