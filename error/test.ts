import { request, IncomingMessage } from 'http'
import express from 'express'
import { HttpError } from '.'

test('express default error handling', (done) => {
	const server = express()
		.get('/', (req, res, next) => {
			const err = HttpError(400, { foo: 'bar' })

			throw err
		})
		.listen(3099, 'localhost')

	request({ hostname: 'localhost', port: 3099, method: 'GET', path: '/' }, (res: IncomingMessage) => {
		expect(res.statusCode).toBe(400)

		res.on('data', (data: Buffer) => {
			// Check stack trace stringification in development env
			expect(data.toString()).toEqual(expect.stringContaining('{&quot;foo&quot;:&quot;bar&quot;}'))

			server.close()
			done()
		})
	}).end()
})
