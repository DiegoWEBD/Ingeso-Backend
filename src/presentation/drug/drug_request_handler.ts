import IDrugServices from '../../application/drug/IDrugServices'
import Drug from '../../domain/drug/Drug'
import DrugAdapter from '../../infrastructure/drug/adapter/DrugAdapter'
import HttpError from '../http/http_error'
import { HttpResponse, makeHttpResponse } from '../http/http_response'
import RequestHandler from '../http/request_handler'
import RequestWithUser from '../http/types/RequestWithUser'

export const makeDrugRequestHandler = (
	drugServices: IDrugServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				if (request.params.name) {
					const drug: Drug = await drugServices.getDrugInformation(
						request.params.name
					)
					return makeHttpResponse(200, DrugAdapter.ToJSON(drug))
				}

				const drugsNames: string[] = await drugServices.getDrugsNames()

				return makeHttpResponse(200, drugsNames)
			}

			case 'DELETE': {
				if (!request.params.name) {
					throw new HttpError(400, 'El nombre de fármaco no fue proporcionado.')
				}

				const deletedDrug = await drugServices.deleteDrug(request.params.name)

				return makeHttpResponse(
					200,
					`Fármaco ${deletedDrug} eliminado correctamente.`
				)
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
