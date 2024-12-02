import IDrugServices from '../../../../application/drug/IDrugServices'
import UnauthorizedError from '../../../../application/errors/unauthorized'
import Drug from '../../../../domain/drug/Drug'
import DrugAdapter from '../../../../infrastructure/drug/adapter/DrugAdapter'
import { HttpResponse, makeHttpResponse } from '../../../http/http_response'
import RequestHandler from '../../../http/request_handler'
import RequestWithUser from '../../../http/types/RequestWithUser'

export const makeGetDrugRequest = (
	drugServices: IDrugServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		if (!request.user) {
			throw new UnauthorizedError('Usuario no autenticado.')
		}

		if (request.params.name) {
			const drug: Drug = await drugServices.getDrugInformation(
				request.params.name
			)
			return makeHttpResponse(200, DrugAdapter.ToJSON(drug))
		}

		const drugsInitialData = await drugServices.getDrugsInitialData(
			request.user.getInstitutionalEmail()
		)

		return makeHttpResponse(200, drugsInitialData)
	}
}
