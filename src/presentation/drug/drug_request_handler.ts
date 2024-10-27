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
					return makeHttpResponse(200, DrugAdapter.ToJSON(drug))
				}

				const drugsNames: string[] = await drugServices.getDrugsNames()

				return makeHttpResponse(200, drugsNames)
			}

			case 'POST': {
				const { name, description, classifications, rams, administrationProceduresWithMethod } = request.body
				if (!name || !description) {
					throw new HttpError(400, 'El nombre y la descripción son obligatorios.')
				}

				
				const newDrug: Drug = await drugServices.registerDrug(
					name,
					description,
					classifications,
					rams,
					new Map(administrationProceduresWithMethod)
				)

				return makeHttpResponse(201, DrugAdapter.toJSON(newDrug))
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
