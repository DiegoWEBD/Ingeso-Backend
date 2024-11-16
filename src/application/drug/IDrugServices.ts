import Drug from '../../domain/drug/Drug'

export default interface IDrugServices {
	getDrugInformation: (name: string) => Promise<Drug>
	getDrugsNames: () => Promise<Array<string>>
	registerDrug: (
		name: string,
		presentation: string,
		description: string,
		rams: Array<string>,
		administrationProceduresWithMethod: Map<string, string>
	) => Promise<Drug>
	addRamToDrug: (drugName: string, reaction: string) => Promise<Drug>
	addAdministrationProcedure: (
		drugName: string,
		method: string,
		procedure: string
	) => Promise<Drug>
	updateDrug: (
		name: string,
		newName?: string,
		newPresentation?: string,
		newDescription?: string,
		newReactions?: Array<string>,
		newAdministrationProcedures?: Map<string, string>
	) => Promise<Drug>

	deleteDrug: (drugName: string) => Promise<Drug>
}
