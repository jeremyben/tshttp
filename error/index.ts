import { makeNewOptional } from './utils'

/**
 * @see https://tools.ietf.org/html/rfc2616#section-10.4
 * @see https://tools.ietf.org/html/rfc2616#section-10.5
 * @enum
 * @internal
 */
const ErrorReason = <const>{
	// Client errors
	400: 'Bad Request',
	401: 'Unauthorized',
	402: 'Payment Required',
	403: 'Forbidden',
	404: 'Not Found',
	405: 'Method Not Allowed',
	406: 'Not Acceptable',
	407: 'Proxy Authentication Required',
	408: 'Request Timeout',
	409: 'Conflict',
	410: 'Gone',
	411: 'Length Required',
	412: 'Precondition Failed',
	413: 'Payload Too Large',
	414: 'URI Too Long',
	415: 'Unsupported Media Type',
	416: 'Requested Range Not Satisfiable',
	417: 'Expectation Failed',
	418: "I'm a Teapot",
	421: 'Misdirected Request',
	422: 'Unprocessable Entity',
	423: 'Locked',
	424: 'Failed Dependency',
	425: 'Unordered Collection',
	426: 'Upgrade Required',
	428: 'Precondition Required',
	429: 'Too Many Requests',
	431: 'Request Header Fields Too Large',
	451: 'Unavailable For Legal Reasons',

	// Server errors
	500: 'Internal Server Error',
	501: 'Not Implemented',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
	504: 'Gateway Timeout',
	505: 'HTTP Version Not Supported',
	506: 'Variant Also Negotiates',
	507: 'Insufficient Storage',
	508: 'Loop Detected',
	509: 'Bandwidth Limit Exceeded',
	510: 'Not Extended',
	511: 'Network Authentication Required',
}

type ErrorReason = typeof ErrorReason
type ErrorStatus = keyof ErrorReason

/**
 * HTTP centric error inherited from the native Error constructor.
 * Can be invoked with or without the `new` keyword.
 *
 * @param code - HTTP error status code.
 * @param message - custom message.
 *
 * @remarks
 * You get more precise inference of instance properties when invoked with `new` only
 * (typescript does not support higher-kinded types {@link https://github.com/Microsoft/TypeScript/issues/1213}).
 *
 * The error `name` property is the reason phrase inferred from `status`,
 * e.g. the `400` status code will give the name `"Bad Request"`.
 *
 * @example
 * throw HttpError(400, 'foo is required')
 *
 * @example
 * const unauthorized = new HttpError(403, { tryTo: 'write', on: 'user' })
 * next(unauthorized)
 *
 * @class
 * @public
 */
const HttpError = makeNewOptional(
	// tslint:disable-next-line: no-shadowed-variable
	class HttpError<T extends ErrorStatus, M extends any = string> extends Error {
		readonly status: T

		/**
		 * Reason phrase inferred from status code.
		 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6.1.1
		 *
		 * @override
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name
		 */
		readonly name: ErrorReason[T]

		/**
		 * @defaultValue empty string
		 *
		 * @override
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message
		 */
		// @ts-ignore override string type inherited from Error
		message: M

		constructor(status: T, message: M = '' as any) {
			super()
			this.status = status
			this.name = ErrorReason[status]
			this.message = message

			// Remove constructor call from stack trace (only work when instantiated with `new`).
			// https://v8.dev/docs/stack-trace-api#stack-trace-collection-for-custom-exceptions
			Error.captureStackTrace(this, HttpError)

			// Stringify message in stack trace if necessary
			if (this.stack && typeof message === 'object') {
				this.stack = this.stack.replace('[object Object]', JSON.stringify(message))
			}
		}

		/**
		 * @override
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString
		 */
		toString() {
			if (!this.message) return this.name
			const message = typeof this.message === 'string' ? this.message : JSON.stringify(this.message)
			return `${this.name}: ${message}`
		}
	}
)

type HttpError = InstanceType<typeof HttpError>

export default HttpError
