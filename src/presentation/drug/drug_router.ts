import { Router } from 'express'
import IDrugServices from '../../application/drug/IDrugServices'
import { makeController } from '../http/controller'
import RequestHandler from '../http/request_handler'
import { makeDrugRequestHandler } from './drug_request_handler'

export const makeDrugRouter = (drugServices: IDrugServices): Router => {
	const requestHandler: RequestHandler = makeDrugRequestHandler(drugServices)
	const drugController = makeController(requestHandler)
	const router = Router()

	router.all('/', drugController)
	router.post('/:name', drugController)
	router.get('/:name', drugController)

	return router
}
