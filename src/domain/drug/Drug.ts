import DrugType from '../drug_type/DrugType'
import AdverseReaction from '../adverse_reaction/AdverseReaction'
import AdministrationProcedure from '../administration_procedure/AdministrationProcedure'
export default class Drug {
	constructor(
		private name: string,
		private description: string,
		private drugTypes: Array<DrugType>,
		private adverseReactions: Array<AdverseReaction>,
		private administrationProcedure: Array<AdministrationProcedure>
	) {}

	getName(): string {
		return this.name
	}

	getDescription(): string {
		return this.description
	}

	getDrugTypes(): Array<DrugType> {
		return this.drugTypes
	}

	getAdverseReactions(): Array<AdverseReaction> {
		return this.adverseReactions
	}

	getAdministrationProcedures(): Array<AdministrationProcedure> {
		return this.administrationProcedure
	}
}
