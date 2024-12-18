import cors from 'cors'
import express, { Express } from 'express'
import ApplicationServices from '../application/ApplicationServices'
import { makeAuthenticationMiddleware } from './auth/authorization/authorization_middleware'
import { makeDrugRouter } from './drug/drug_router'
import { makeGoogleAuthenticationRouter } from './google_auth/google_authentication_router'
import { makeUserRouter } from './user/user_router'
import { makeRefreshTokenRouter } from './auth/authentication/refresh_token_router'
import { makeFavoritesRouter } from './drug/favorites_router'

export default class Api {
	private app: Express
	private applicationServices: ApplicationServices

	constructor(applicationServices: ApplicationServices) {
		this.app = express()
		this.app.use(cors())
		this.app.use(express.json())
		this.applicationServices = applicationServices
	}

	run(port: number | string) {
		this.app.get('/api', (_, res) => {
			res.status(200).json({
				message: 'Api de la aplicación "Guía de Farmacología".',
				endpoints: [
					{
						endpoint: '/drugs',
						description:
							'Obtener información de los fármacos registrados en el sistema.',
						protected: true,
					},
					{
						endpoint: '/auth',
						description:
							'Autenticar una cuenta institucional de un alumno o profesor de la Universidad Católica del Norte.',
						protected: false,
					},
				],
			})
		})

		const authenticationMiddleware = makeAuthenticationMiddleware(
			this.applicationServices.getUserServices()
		)

		this.app.use(
			'/auth',
			makeGoogleAuthenticationRouter(
				this.applicationServices.getUserServices()
			)
		)

		this.app.use(
			'/refresh',
			makeRefreshTokenRouter(this.applicationServices.getUserServices())
		)

		this.app.use(
			'/drugs',
			authenticationMiddleware,
			makeDrugRouter(this.applicationServices.getDrugServices())
		)

		this.app.use(
			'/user',
			authenticationMiddleware,
			makeUserRouter(this.applicationServices.getUserServices())
		)

		this.app.use(
            '/favorites',
            authenticationMiddleware,
            makeFavoritesRouter(this.applicationServices.getUserServices())
        );

		this.app.listen(port, () => {
			console.log(`Servidor corriendo en http://localhost:${port}`)
		})
	}
}
