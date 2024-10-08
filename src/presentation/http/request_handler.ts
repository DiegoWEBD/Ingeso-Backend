import { Request } from 'express'
import { HttpResponse } from './http_response'

type RequestHandler = (request: Request) => Promise<HttpResponse>

export default RequestHandler
