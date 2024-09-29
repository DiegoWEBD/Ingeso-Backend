import AdministrationRoute from './AdministrationRoute'

export default interface AdministrationRouteRepository {
	add: (administrationRoute: AdministrationRoute) => Promise<void>
	getAll: () => Promise<Array<AdministrationRoute>>
	findByRoute: (route: string) => Promise<AdministrationRoute | undefined>
	update: (route: string, newValues: AdministrationRoute) => Promise<void>
	delete: (administrationRoute: AdministrationRoute) => Promise<void>
}
