import IDrugServices from '../../../../application/drug/IDrugServices'
import HttpError from '../../../http/http_error'
import { HttpResponse, makeHttpResponse } from '../../../http/http_response'
import RequestHandler from '../../../http/request_handler'
import RequestWithUser from '../../../http/types/RequestWithUser'

export const makePutDrugRequest = (
	drugServices: IDrugServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		if (!request.params.name) {
			throw new HttpError(
				400,
				'El nombre de fármaco no fue proporcionado.'
			)
		}

		const data = request.body

		const administrationProceduresMap = new Map<string, string>()

		data.new_administration_procedures?.forEach((p: any) => {
			administrationProceduresMap.set(p.method, p.procedure)
		})

		const updatedDrug = await drugServices.updateDrug(
			request.params.name,
			data.new_name,
			data.new_presentation,
			data.new_description,
			data.new_reactions,
			administrationProceduresMap
		)

		return makeHttpResponse(200, {
			message: 'Fármaco actualizado correctamente',
			drug: updatedDrug,
		})
	}
}
