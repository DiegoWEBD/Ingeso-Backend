import IDrugServices from '../../../../application/drug/IDrugServices'
import Drug from '../../../../domain/drug/Drug'
import DrugAdapter from '../../../../infrastructure/drug/adapter/DrugAdapter'
import { HttpResponse, makeHttpResponse } from '../../../http/http_response'
import RequestHandler from '../../../http/request_handler'
import RequestWithUser from '../../../http/types/RequestWithUser'

export const makeGetDrugRequest = (
	drugServices: IDrugServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		if (request.params.name) {
			const drug: Drug = await drugServices.getDrugInformation(
				request.params.name
			)
			return makeHttpResponse(200, DrugAdapter.ToJSON(drug))
		}

		const drugsNames: string[] = await drugServices.getDrugsNames()

		return makeHttpResponse(200, drugsNames)
	}
}
