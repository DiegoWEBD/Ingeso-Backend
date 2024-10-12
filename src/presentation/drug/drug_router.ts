import { Router } from 'express'
import IDrugServices from '../../application/drug/IDrugServices'
import RequestHandler from '../http/request_handler'
import { makeDrugRequestHandler } from './drug_request_handler'
import { makeController } from '../http/controller'
import { authorizationMiddleware } from '../middlewares/authorization_middleware'

export const makeDrugRouter = (drugServices: IDrugServices): Router => {
  const router = Router()
  const requestHandler: RequestHandler = makeDrugRequestHandler(drugServices)
  const drugController = makeController(requestHandler)

  router.all('/', authorizationMiddleware, drugController)
  router.all('/:name', drugController)

  return router
}
