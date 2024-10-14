import express, { Express } from 'express'
import cors from 'cors'
import ApplicationServices from '../application/ApplicationServices'
import { makeDrugRouter } from './drug/drug_router'

export default class Api {
	private app: Express
	private applicationServices: ApplicationServices

	constructor(applicationServices: ApplicationServices) {
		this.app = express()
		this.app.use(cors())
		this.applicationServices = applicationServices
	}

	run(port: number | string) {
		this.app.get('/', (_, res) => {
			res.json({
				message: 'Api OK!',
			})
		})

		this.app.use(
			'/drugs',
			makeDrugRouter(this.applicationServices.getDrugServices())
		)

		this.app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`)
		})
	}
}
