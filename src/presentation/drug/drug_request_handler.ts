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

			case 'POST': {
				if (!request.body) {
					throw new HttpError(400, 'Faltan datos del fármaco.')
				}

				const {
					name,
					presentation,
					description,
					classifications,
					rams,
					administrationProceduresWithMethod,
				} = request.body

				// Crear el objeto Drug
				const drug = new Drug(
					name,
					presentation,
					description,
					classifications,
					rams,
					administrationProceduresWithMethod
				)

				// Llamar al servicio para registrar el fármaco
				const registeredDrug = await drugServices.registerDrug(
					drug.getName(),
					drug.getPresentation(),
					drug.getDescription(),
					drug
						.getDrugClassifications()
						.map((classification) => classification.getClassification()),
					drug.getRams().map((ram) => ram.getReaction()),
					new Map<string, string>(
						drug
							.getAdministrationProcedures()
							.map((procedure) => [
								procedure.getMethod(),
								procedure.getProcedure(),
							])
					)
				)

				return makeHttpResponse(200, registeredDrug)
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
