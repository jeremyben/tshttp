import { request, IncomingMessage } from 'http'
import express from 'express'
import HttpError from '.'

test('express default error handling', (done) => {
	const server = express()
		.get('', (req, res, next) => {
			throw HttpError(400, { foo: 'bar' })
		})
		.listen(3000)

	request({ hostname: 'localhost', port: 3000, method: 'GET' }, (res: IncomingMessage) => {
		expect(res.statusCode).toBe(400)

		res.on('data', (data: Buffer) => {
			// Check stack trace stringification in development env
			expect(data.toString()).toEqual(expect.stringContaining('{&quot;foo&quot;:&quot;bar&quot;}'))

			server.close()
			done()
		})
	}).end()
})
