import { HttpResponse } from './http_response'
import RequestWithUser from './types/RequestWithUser'

type RequestHandler = (request: RequestWithUser) => Promise<HttpResponse>

export default RequestHandler
