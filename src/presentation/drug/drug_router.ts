import { Router } from 'express'
import IDrugServices from '../../application/drug/IDrugServices'
import { makeController } from '../http/controller'
import RequestHandler from '../http/request_handler'
import { makeDrugRequestHandler } from './drug_request_handler'
import { teacherAuthorizationMiddleware } from '../authorization/teacher_authorization_middleware'
import { DrugValidator } from '../../application/drug/DrugValidator'

export const makeDrugRouter = (drugServices: IDrugServices): Router => {
	const drugValidator = new DrugValidator()
	const requestHandler: RequestHandler = makeDrugRequestHandler(drugServices, drugValidator)
	const drugController = makeController(requestHandler)
	const router = Router()

	router.get('/', drugController)
	router.get('/:name', drugController)
	router.post('/:name', teacherAuthorizationMiddleware, drugController)
	router.delete('/:name', teacherAuthorizationMiddleware, drugController)

	return router
}
