import { Request } from 'express'
import IDrugServices from '../../application/drug/IDrugServices'
import HttpError from '../http/http_error'
import { HttpResponse, makeHttpResponse } from '../http/http_response'
import RequestHandler from '../http/request_handler'
import Drug from '../../domain/drug/Drug'
import DrugAdapter from '../../infrastructure/drug/adapter/DrugAdapter'

export const makeDrugRequestHandler = (
	drugServices: IDrugServices
): RequestHandler => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				if (request.params.name) {
					const drug: Drug = await drugServices.getDrugInformation(
						request.params.name
					)
					return makeHttpResponse(200, DrugAdapter.toJSON(drug))
				}

				const drugsNames: string[] = await drugServices.getDrugsNames()
				return makeHttpResponse(200, drugsNames)
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
