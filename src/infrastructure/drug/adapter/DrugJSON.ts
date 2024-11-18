import { AdministrationProcedureJSON } from '../../administration_procedure/adapter/AdministrationProcedureJSON'
import { RamJSON } from '../../ram/adapter/RamJSON'

export type DrugJSON = {
	name: string
	presentation: string
	description: string
	rams: Array<RamJSON>
	administration_procedures: Array<AdministrationProcedureJSON>
}
