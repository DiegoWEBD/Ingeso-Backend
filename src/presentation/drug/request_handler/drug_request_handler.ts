import IDrugServices from '../../../application/drug/IDrugServices'
import DrugAdapter from '../../../infrastructure/drug/adapter/DrugAdapter'
import HttpError from '../../http/http_error'
import { HttpResponse, makeHttpResponse } from '../../http/http_response'
import RequestHandler from '../../http/request_handler'
import RequestWithUser from '../../http/types/RequestWithUser'
import { makeGetDrugRequest } from './requests/get'
import { makePutDrugRequest } from './requests/put'

export const makeDrugRequestHandler = (
	drugServices: IDrugServices
): RequestHandler => {
	return async (request: RequestWithUser): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				const getRequest = makeGetDrugRequest(drugServices)
				return getRequest(request)
			}

			case 'POST': {
				if (!request.body) {
					throw new HttpError(400, 'Faltan datos del fármaco.')
				}

				const {
					name,
					presentation,
					description,
					rams,
					administration_procedures_with_method,
				} = request.body

				const administrationProceduresMap = new Map<string, string>()

				administration_procedures_with_method.forEach((p: any) => {
					administrationProceduresMap.set(p.method, p.procedure)
				})

				// Llamar al servicio para registrar el fármaco
				const drug = await drugServices.registerDrug(
					name,
					presentation,
					description,
					rams,
					administrationProceduresMap
				)

				return makeHttpResponse(200, DrugAdapter.ToJSON(drug))
			}

			case 'PUT': {
				const updateRequest = makePutDrugRequest(drugServices)
				return updateRequest(request)
			}

			case 'DELETE': {
				if (!request.params.name) {
					throw new HttpError(400, 'El nombre de fármaco no fue proporcionado.')
				}

				const deletedDrug = await drugServices.deleteDrug(request.params.name)

				return makeHttpResponse(200, {
					message: 'Fármaco eliminado correctamente.',
					drug: deletedDrug,
				})
			}

			default: {
				throw new HttpError(405, `Método ${request.method} no permitido.`)
			}
		}
	}
}
