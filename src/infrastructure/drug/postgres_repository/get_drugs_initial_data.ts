import DrugInitialData from '../../../application/drug/DrugInitialData'
import Database from '../../../presentation/database/Database'

export const makeGetDrugsInitialData = (database: Database) => {
	return async (userEmail: string): Promise<Array<DrugInitialData>> => {
		const query = `
			with user_favorites as 
			(
				select drug_name 
				from favorite_drug 
				where user_institutional_email = $1
			)
			select d.name as drug_name,
			(uf.drug_name is not null) as is_favorite
			from drug d
			left join user_favorites uf 
			on d.name = uf.drug_name
		`
		const drugsNames = await database.queryMany(query, [userEmail])

		return drugsNames.map((obj) => ({
			name: obj.drug_name,
			favorite: obj.is_favorite,
		}))
	}
}
