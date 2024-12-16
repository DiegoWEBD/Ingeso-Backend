import { Router } from 'express'
import IDrugServices from '../../application/drug/IDrugServices'
import { teacherAuthorizationMiddleware } from '../auth/authorization/teacher_authorization_middleware'
import { makeController } from '../http/controller'
import RequestHandler from '../http/request_handler'
import { makeDrugRequestHandler } from './request_handler/drug_request_handler'
import multer from 'multer'
import path from 'path'
import XLSX from 'xlsx'
import fs from 'fs'

const readDataFromExcel = (filePath: string) => {
	const readExcel = () => {
		const fileBuffer = fs.readFileSync(filePath)
		const workbook = XLSX.read(fileBuffer, { type: 'buffer' })
		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]
		const data = XLSX.utils.sheet_to_json(worksheet)
		return data
	}

	const parseData = (data: any) => {
		return data.map((row: any) => {
			const administrationProcedures = []
			let descriptionArray = row.__EMPTY_2.split('\n')
			let ramsArray = row.__EMPTY_6.split('\n')

			if (row.__EMPTY_3) {
				administrationProcedures.push({
					method: 'bolo directo',
					procedure: row.__EMPTY_3,
				})
			}

			if (row.__EMPTY_4) {
				administrationProcedures.push({
					method: 'bolo intermitente',
					procedure: row.__EMPTY_4,
				})
			}

			if (row.__EMPTY_5) {
				administrationProcedures.push({
					method: 'infusión continua',
					procedure: row.__EMPTY_5,
				})
			}

			return {
				name: row.__EMPTY.trim(),
				presentation: row.__EMPTY_1,
				description: descriptionArray.join(' '),
				administrationProcedures,
				rams: [{ reaction: ramsArray.join(' ') }],
			}
		})
	}

	let data = readExcel()
	return parseData(data)
}

const loadDataToDatabase = async (data: any, drugServices: IDrugServices) => {
	for (let row of data) {
		const administrationProceduresMap = new Map<string, string>()

		row.administrationProcedures.forEach((ap: any) =>
			administrationProceduresMap.set(ap.method, ap.procedure)
		)

		await drugServices.registerDrug(
			row.name,
			row.presentation,
			row.description,
			row.rams.map((r: any) => r.reaction),
			administrationProceduresMap
		)
	}
}

export const makeDrugRouter = (drugServices: IDrugServices): Router => {
	const requestHandler: RequestHandler = makeDrugRequestHandler(drugServices)
	const drugController = makeController(requestHandler)
	const router = Router()

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/')
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + path.extname(file.originalname))
		},
	})

	const upload = multer({ storage })

	router.post('/upload', upload.single('file'), async (req, res) => {
		if (!req.file) {
			res.status(400).json({
				message: 'El archivo no fue proporcionado.',
			})
			return
		}

		const data = readDataFromExcel(`uploads/${req.file.filename}`)
		await loadDataToDatabase(data, drugServices)
		res.status(200).json({ message: 'Archivo subido correctamente.' })
	})

	router.get('/', drugController)
	router.post('/', teacherAuthorizationMiddleware, drugController)
	router.get('/:name', drugController)
	router.put('/:name', teacherAuthorizationMiddleware, drugController)
	router.delete('/:name', teacherAuthorizationMiddleware, drugController)

	return router
}
