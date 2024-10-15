import { AdministrationProcedureJSON } from '../../administration_procedure/adapter/AdministrationProcedureJSON'
import { DrugClassificationJSON } from '../../drug_classification/adapter/DrugClassificationJSON'
import { RamJSON } from '../../ram/adapter/RamJSON'

export type DrugJSON = {
	name: string
	description: string
	drug_classifications: Array<DrugClassificationJSON>
	rams: Array<RamJSON>
	administration_procedures: Array<AdministrationProcedureJSON>
}
