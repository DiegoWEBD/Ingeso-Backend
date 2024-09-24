import express, { Express } from 'express'

export default class Api {
	private app: Express

	constructor() {
		this.app = express()
	}

	serve(port: number | string) {
		this.app.get('/', (_, res) => {
			res.json({
				message: 'Api OK!',
			})
		})

		this.app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`)
		})
	}
}
