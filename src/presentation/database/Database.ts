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

	async execute(query: string, params: Array<string>): Promise<void> {
		await this.db.none(query, params)
	}

	async queryOne(query: string, params: Array<any>): Promise<any | null> {
		const data: any | undefined = await this.db.oneOrNone(query, params)
		return data ? data : null
	}

	async queryMany(query: string, params: Array<any>): Promise<Array<any>> {
		return await this.db.many(query, params)
	}

	close(): void {
		this.pgp.end()
	}
}
