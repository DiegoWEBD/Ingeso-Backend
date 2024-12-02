import IUserServices from '../../../application/user/IUserServices';
import { HttpResponse, makeHttpResponse } from '../../http/http_response';
import RequestHandler from '../../http/request_handler';
import RequestWithUser from '../../http/types/RequestWithUser';
import HttpError from '../../http/http_error';

export const makeFavoritesRequestHandler = (
  userServices: IUserServices
): RequestHandler => {
  return async (request: RequestWithUser): Promise<HttpResponse> => {
    if (!request.user) {
      throw new HttpError(401, 'Usuario no autenticado.');
    }

    const userEmail = request.user.getInstitutionalEmail();
    const { drugName } = request.params;

    switch (request.method) {
      case 'POST': {
        await userServices.addFavorite(drugName, userEmail);
        return makeHttpResponse(200, { message: 'Favorito agregado correctamente.' });
      }

      case 'DELETE': {
        await userServices.removeFavorite(drugName, userEmail);
        return makeHttpResponse(200, { message: 'Favorito eliminado correctamente.' });
      }

      case 'GET': {
        const isFavorite = await userServices.isFavorite(drugName, userEmail);
        return makeHttpResponse(200, { isFavorite });
      }

      default: {
        throw new HttpError(405, `Método ${request.method} no permitido.`);
      }
    }
  };
};