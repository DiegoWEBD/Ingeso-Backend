import Drug from '../../domain/drug/Drug'

export default interface IDrugServices {
	getDrugInformation: (name: string) => Promise<Drug>
	getDrugsNames: () => Promise<Array<string>>
	registerDrug: (
		name: string,
		description: string,
		dtypes: string[],
		adverseReactionNames: string[],
		administrationRoutesWithProcedure: Map<string, string>
	) => Promise<Drug>
	addDrugTypeToDrug: (drugName: string, dtype: string) => Promise<Drug>
	addAdverseReactionBetweenDrugs: (
		drugName1: string,
		drugName2: string
	) => Promise<[Drug, Drug]>
	addDrugAdministrationRoute: (
		drugName: string,
		route: string,
		procedure: string
	) => Promise<Drug>
}
