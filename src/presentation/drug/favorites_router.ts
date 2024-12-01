import { Router } from 'express';
import IUserServices from '../../application/user/IUserServices';
import { makeController } from '../http/controller';
import { makeFavoritesRequestHandler } from './request_handler/favorites_request_handler';

export const makeFavoritesRouter = (userServices: IUserServices): Router => {
  const requestHandler = makeFavoritesRequestHandler(userServices);
  const favoritesController = makeController(requestHandler);
  const router = Router();

  router.all('/:drugName', favoritesController);

  return router;
};