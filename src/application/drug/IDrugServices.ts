import Drug from '../../domain/drug/Drug'
import DrugInitialData from './DrugInitialData'

export default interface IDrugServices {
	getDrugInformation: (name: string) => Promise<Drug>
	getDrugsInitialData: (userEmail: string) => Promise<Array<DrugInitialData>>
	registerDrug: (
		name: string,
		presentation: string,
		description: string,
		rams: Array<string>,
		administrationProceduresWithMethod: Map<string, string>
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
