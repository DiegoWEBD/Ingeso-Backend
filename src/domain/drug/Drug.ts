import AdministrationProcedure from '../administration_procedure/AdministrationProcedure'
import Ram from '../ram/Ram'
export default class Drug {
	constructor(
		private name: string,
		private presentation: string,
		private description: string,
		private rams: Array<Ram>,
		private administrationProcedures: Array<AdministrationProcedure>
	) {}

	getName(): string {
		return this.name
	}

	getDescription(): string {
		return this.description
	}

	getPresentation(): string {
		return this.presentation
	}

	getRams(): Array<Ram> {
		return this.rams
	}

	getAdministrationProcedures(): Array<AdministrationProcedure> {
		return this.administrationProcedures
	}
	setName(newName: string): void {
		this.name = newName
	}

	setDescription(newDescription: string): void {
		this.description = newDescription
	}

	setPresentation(newPresentation: string): void {
		this.presentation = newPresentation
	}

	setRams(newRams: Array<Ram>): void {
		this.rams = newRams
	}

	setAdministrationProcedures(
		newProcedures: Array<AdministrationProcedure>
	): void {
		this.administrationProcedures = newProcedures
	}
}
