export type HttpResponse = {
	code: number
	data: Object | null
}

export const makeHttpResponse = (
	code: number,
	data: Object | null = null
): HttpResponse => Object.freeze({ code, data })
