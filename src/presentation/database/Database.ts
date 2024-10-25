import pgPromise, { IDatabase, IMain } from 'pg-promise'
import { IClient } from 'pg-promise/typescript/pg-subset'
import DatabaseConnectionData from './connection'

export default class Database {
	private connectionData: DatabaseConnectionData
	private pgp: IMain<{}, IClient>
	private db: IDatabase<{}, IClient>

	constructor() {
		this.connectionData = {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		}
		this.pgp = pgPromise()
		this.db = this.pgp(this.connectionData)
	}

	async queryOne(query: string, params: Array<any>): Promise<any> {
		return this.db.oneOrNone(query, params)
	}

	async queryMany(query: string, params: Array<any>): Promise<Array<any>> {
		return this.db.many(query, params)
	}

	close(): void {
		this.pgp.end()
	}
}
