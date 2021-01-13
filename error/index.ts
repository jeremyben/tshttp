/**
 * https://tools.ietf.org/html/rfc2616#section-10.4
 * @public
 */
const errors = <const>{
	// Client errors
	400: 'BadRequest',
	401: 'Unauthorized',
	402: 'PaymentRequired',
	403: 'Forbidden',
	404: 'NotFound',
	405: 'MethodNotAllowed',
	406: 'NotAcceptable',
	407: 'ProxyAuthenticationRequired',
	408: 'RequestTimeout',
	409: 'Conflict',
	410: 'Gone',
	411: 'LengthRequired',
	412: 'PreconditionFailed',
	413: 'PayloadTooLarge',
	414: 'URITooLong',
	415: 'UnsupportedMediaType',
	416: 'RequestedRangeNotSatisfiable',
	417: 'ExpectationFailed',
	418: 'ImATeapot',
	421: 'MisdirectedRequest',
	422: 'UnprocessableEntity',
	423: 'Locked',
	424: 'FailedDependency',
	425: 'UnorderedCollection',
	426: 'UpgradeRequired',
	428: 'PreconditionRequired',
	429: 'TooManyRequests',
	431: 'RequestHeaderFieldsTooLarge',
	451: 'UnavailableForLegalReasons',

	// Server errors
	500: 'InternalServerError',
	501: 'NotImplemented',
	502: 'BadGateway',
	503: 'ServiceUnavailable',
	504: 'GatewayTimeout',
	505: 'HTTPVersionNotSupported',
	506: 'VariantAlsoNegotiates',
	507: 'InsufficientStorage',
	508: 'LoopDetected',
	510: 'NotExtended',
	511: 'NetworkAuthenticationRequired',
}

/**
 * @public
 */
type Errors = typeof errors

/**
 * @public
 */
type ErrorStatus = keyof Errors

/**
 * @public
 */
type AvailableStatus = Augmentation.Constraint extends { status: infer S }
	? S extends number
		? S
		: never
	: ErrorStatus

/**
 * @public
 */
type AvailableName = Errors[Extract<ErrorStatus, AvailableStatus>]

/**
 * @public
 */
interface HttpErrorStatic extends Pick<typeof HttpError, AvailableName | keyof typeof Error> {}

/**
 * @public
 */
interface HttpErrorConstructor {
	new <S extends AvailableStatus>(
		...args: keyof Augmentation.HttpErrors[S] extends undefined
			? [status: S, message?: string]
			: [status: S, data: AugmentedParameter<S>]
	): _HttpError<S>

	<S extends AvailableStatus>(
		...args: keyof Augmentation.HttpErrors[S] extends undefined
			? [status: S, message?: string]
			: [status: S, data: AugmentedParameter<S>]
	): _HttpError<S>
}

/**
 * @public
 */
type AugmentedParameter<S extends AvailableStatus | ErrorStatus> = Augmentation.HttpErrors[S] extends {
	[P in ProctectedProperty]?: any
}
	? never
	: Augmentation.HttpErrors[S]

/**
 * @public
 */
type StaticErrorParameters<
	S extends AvailableStatus | ErrorStatus
> = keyof Augmentation.HttpErrors[S] extends undefined ? [message?: string] : [data: AugmentedParameter<S>]

/**
 * @public
 */
type Augmented<S extends AvailableStatus | ErrorStatus> = Augmentation.HttpErrors[S] extends {
	message?: any
}
	? Omit<Augmentation.HttpErrors[S], 'message'>
	: Augmentation.HttpErrors[S]

/**
 * @public
 */
const protectedProperties = <const>['__proto__', 'constructor', 'prototype', 'name', 'status', 'stack']

/**
 * @public
 */

type ProctectedProperty = typeof protectedProperties[number]

/**
 * @internal
 */
const proxyHandler: ProxyHandler<typeof HttpError> = {
	apply(target, _this, args: any[]) {
		return new (target as any)(args[0], args[1], 2)
	},
}

/**
 * HTTP centric error inherited from the native Error constructor.
 * @public
 */
class HttpError<S extends AvailableStatus | ErrorStatus> extends Error {
	/**
	 * HTTP status code.
	 */
	readonly status: S

	/**
	 * Name inferred from status code.
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6.1.1
	 */
	readonly name: S extends ErrorStatus ? Errors[S] : 'HttpError'

	constructor(
		// Only way to make an argument either required or optional without overloading (which does not work properly without `new` keyword)
		...args: keyof Augmentation.HttpErrors[S] extends undefined
			? [status: S, message?: string]
			: [status: S, data: AugmentedParameter<S>]
	) {
		super(typeof args[1] === 'object' ? '' : args[1])

		this.name = (<any>errors)[args[0]] || this.constructor.name
		Object.defineProperty(this, 'name', { enumerable: false }) // keep the original configuration of Error.

		this.status = args[0]

		// Assign properties directly to the error object if the interface was augmented.
		if (typeof args[1] === 'object' && !!args[1]) {
			const data: Record<string, any> = args[1]

			for (const key in data) {
				// Prevent prototype pollution or overwriting important properties.
				if (!data.hasOwnProperty(key) || protectedProperties.includes(<any>key)) {
					continue
				}

				if (key === 'message') {
					// Always cast message to string.
					const message: string =
						typeof data[key] === 'string'
							? data[key]
							: data[key] != null
							? JSON.stringify(data[key])
							: ''

					super.message = message // attach to parent to keep message non-enumerable.
				} else {
					this[key as 'toString'] = data[key]
				}
			}
		}

		// Remove constructor call from stack trace (only work when instantiated with `new`).
		// https://v8.dev/docs/stack-trace-api#stack-trace-collection-for-custom-exceptions
		// Use the hidden third argument to get or not the right caller.
		const constructorOpt =
			(<any>args)[2] === 1
				? HttpError[<'BadRequest'>this.name] || HttpError
				: (<any>args)[2] === 2
				? proxyHandler.apply
				: HttpError

		Error.captureStackTrace(this, constructorOpt)
	}

	/**
	 * `400`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
	 */
	static BadRequest(...args: StaticErrorParameters<400>) {
		const error = new (HttpError as any)(400, args[0], 1)
		return error as _HttpError<400>
	}

	/**
	 * `401`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
	 */
	static Unauthorized(...args: StaticErrorParameters<401>) {
		const error = new (HttpError as any)(401, args[0], 1)
		return error as _HttpError<401>
	}

	/**
	 * `402`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
	 */
	static PaymentRequired(...args: StaticErrorParameters<402>) {
		const error = new (HttpError as any)(402, args[0], 1)
		return error as _HttpError<402>
	}

	/**
	 * `403`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
	 */
	static Forbidden(...args: StaticErrorParameters<403>) {
		const error = new (HttpError as any)(403, args[0], 1)
		return error as _HttpError<403>
	}

	/**
	 * `404`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
	 */
	static NotFound(...args: StaticErrorParameters<404>) {
		const error = new (HttpError as any)(404, args[0], 1)
		return error as _HttpError<404>
	}

	/**
	 * `405`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
	 */
	static MethodNotAllowed(...args: StaticErrorParameters<405>) {
		const error = new (HttpError as any)(405, args[0], 1)
		return error as _HttpError<405>
	}

	/**
	 * `406`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406
	 */
	static NotAcceptable(...args: StaticErrorParameters<406>) {
		const error = new (HttpError as any)(406, args[0], 1)
		return error as _HttpError<406>
	}

	/**
	 * `407`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407
	 */
	static ProxyAuthenticationRequired(...args: StaticErrorParameters<407>) {
		const error = new (HttpError as any)(407, args[0], 1)
		return error as _HttpError<407>
	}

	/**
	 * `408`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408
	 */
	static RequestTimeout(...args: StaticErrorParameters<408>) {
		const error = new (HttpError as any)(408, args[0], 1)
		return error as _HttpError<408>
	}

	/**
	 * `409`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
	 */
	static Conflict(...args: StaticErrorParameters<409>) {
		const error = new (HttpError as any)(409, args[0], 1)
		return error as _HttpError<409>
	}

	/**
	 * `410`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410
	 */
	static Gone(...args: StaticErrorParameters<410>) {
		const error = new (HttpError as any)(410, args[0], 1)
		return error as _HttpError<410>
	}

	/**
	 * `411`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411
	 */
	static LengthRequired(...args: StaticErrorParameters<411>) {
		const error = new (HttpError as any)(411, args[0], 1)
		return error as _HttpError<411>
	}

	/**
	 * `412`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412
	 */
	static PreconditionFailed(...args: StaticErrorParameters<412>) {
		const error = new (HttpError as any)(412, args[0], 1)
		return error as _HttpError<412>
	}

	/**
	 * `413`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413
	 */
	static PayloadTooLarge(...args: StaticErrorParameters<413>) {
		const error = new (HttpError as any)(413, args[0], 1)
		return error as _HttpError<413>
	}

	/**
	 * `414`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414
	 */
	static URITooLong(...args: StaticErrorParameters<414>) {
		const error = new (HttpError as any)(414, args[0], 1)
		return error as _HttpError<414>
	}

	/**
	 * `415`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415
	 */
	static UnsupportedMediaType(...args: StaticErrorParameters<415>) {
		const error = new (HttpError as any)(415, args[0], 1)
		return error as _HttpError<415>
	}

	/**
	 * `416`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416
	 */
	static RequestedRangeNotSatisfiable(...args: StaticErrorParameters<416>) {
		const error = new (HttpError as any)(416, args[0], 1)
		return error as _HttpError<416>
	}

	/**
	 * `417`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417
	 */
	static ExpectationFailed(...args: StaticErrorParameters<417>) {
		const error = new (HttpError as any)(417, args[0], 1)
		return error as _HttpError<417>
	}

	/**
	 * `418`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
	 */
	static ImATeapot(...args: StaticErrorParameters<418>) {
		const error = new (HttpError as any)(418, args[0], 1)
		return error as _HttpError<418>
	}

	/**
	 * `421`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421
	 */
	static MisdirectedRequest(...args: StaticErrorParameters<421>) {
		const error = new (HttpError as any)(421, args[0], 1)
		return error as _HttpError<421>
	}

	/**
	 * `422`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
	 */
	static UnprocessableEntity(...args: StaticErrorParameters<422>) {
		const error = new (HttpError as any)(422, args[0], 1)
		return error as _HttpError<422>
	}

	/**
	 * `423`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423
	 */
	static Locked(...args: StaticErrorParameters<423>) {
		const error = new (HttpError as any)(423, args[0], 1)
		return error as _HttpError<423>
	}

	/**
	 * `424`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424
	 */
	static FailedDependency(...args: StaticErrorParameters<424>) {
		const error = new (HttpError as any)(424, args[0], 1)
		return error as _HttpError<424>
	}

	/**
	 * `425`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425
	 */
	static UnorderedCollection(...args: StaticErrorParameters<425>) {
		const error = new (HttpError as any)(425, args[0], 1)
		return error as _HttpError<425>
	}

	/**
	 * `426`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426
	 */
	static UpgradeRequired(...args: StaticErrorParameters<426>) {
		const error = new (HttpError as any)(426, args[0], 1)
		return error as _HttpError<426>
	}

	/**
	 * `428`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428
	 */
	static PreconditionRequired(...args: StaticErrorParameters<428>) {
		const error = new (HttpError as any)(428, args[0], 1)
		return error as _HttpError<428>
	}

	/**
	 * `429`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429
	 */
	static TooManyRequests(...args: StaticErrorParameters<429>) {
		const error = new (HttpError as any)(429, args[0], 1)
		return error as _HttpError<429>
	}

	/**
	 * `431`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431
	 */
	static RequestHeaderFieldsTooLarge(...args: StaticErrorParameters<431>) {
		const error = new (HttpError as any)(431, args[0], 1)
		return error as _HttpError<431>
	}

	/**
	 * `451`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451
	 */
	static UnavailableForLegalReasons(...args: StaticErrorParameters<451>) {
		const error = new (HttpError as any)(451, args[0], 1)
		return error as _HttpError<451>
	}

	/**
	 * `500`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
	 */
	static InternalServerError(...args: StaticErrorParameters<500>) {
		const error = new (HttpError as any)(500, args[0], 1)
		return error as _HttpError<500>
	}

	/**
	 * `501`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501
	 */
	static NotImplemented(...args: StaticErrorParameters<501>) {
		const error = new (HttpError as any)(501, args[0], 1)
		return error as _HttpError<501>
	}

	/**
	 * `502`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502
	 */
	static BadGateway(...args: StaticErrorParameters<502>) {
		const error = new (HttpError as any)(502, args[0], 1)
		return error as _HttpError<502>
	}

	/**
	 * `503`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503
	 */
	static ServiceUnavailable(...args: StaticErrorParameters<503>) {
		const error = new (HttpError as any)(503, args[0], 1)
		return error as _HttpError<503>
	}

	/**
	 * `504`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504
	 */
	static GatewayTimeout(...args: StaticErrorParameters<504>) {
		const error = new (HttpError as any)(504, args[0], 1)
		return error as _HttpError<504>
	}

	/**
	 * `505`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505
	 */
	static HTTPVersionNotSupported(...args: StaticErrorParameters<505>) {
		const error = new (HttpError as any)(505, args[0], 1)
		return error as _HttpError<505>
	}

	/**
	 * `506`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506
	 */
	static VariantAlsoNegotiates(...args: StaticErrorParameters<506>) {
		const error = new (HttpError as any)(506, args[0], 1)
		return error as _HttpError<506>
	}

	/**
	 * `507`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507
	 */
	static InsufficientStorage(...args: StaticErrorParameters<507>) {
		const error = new (HttpError as any)(507, args[0], 1)
		return error as _HttpError<507>
	}

	/**
	 * `508`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
	 */
	static LoopDetected(...args: StaticErrorParameters<508>) {
		const error = new (HttpError as any)(508, args[0], 1)
		return error as _HttpError<508>
	}

	/**
	 * `510`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510
	 */
	static NotExtended(...args: StaticErrorParameters<510>) {
		const error = new (HttpError as any)(510, args[0], 1)
		return error as _HttpError<510>
	}

	/**
	 * `511`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511
	 */
	static NetworkAuthenticationRequired(...args: StaticErrorParameters<511>) {
		const error = new (HttpError as any)(511, args[0], 1)
		return error as _HttpError<511>
	}
}

/**
 * HTTP centric error.
 *
 * @param status - HTTP error status code.
 * @param message - Custom message.
 *
 * @remarks
 * - Invocation with or without the `new` keyword.
 * - Dedicated static methods for every known status.
 * - The error `name` is inferred from `status`,  _e.g._ `400` gives `BadRequest`.
 *
 * ---
 * @example
 * ```ts
 * throw HttpError(400)
 * // ---
 * const err = HttpError.Forbidden('Access denied')
 * next(err)
 * ```
 * ---
 * @class
 * @public
 */
const _HttpError: Augmentation.Constraint extends { constructor: false }
	? HttpErrorStatic
	: HttpErrorConstructor & HttpErrorStatic = new Proxy<any>(HttpError, proxyHandler)

type _HttpError<S extends AvailableStatus> = HttpError<S> & Augmented<S>

// tslint:disable: no-shadowed-variable
namespace _HttpError {
	/**
	 * Available status codes.
	 * @public
	 */
	export type Status = AvailableStatus

	/**
	 * Parameter for a specific error status.
	 * _Useful if the error interface has been augmented._
	 * @public
	 */
	export type Parameter<S extends AvailableStatus> = StaticErrorParameters<S>[0]

	/**
	 * `400`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
	 */
	export type BadRequest = _HttpError<400>
	export namespace BadRequest {
		export type Parameter = StaticErrorParameters<400>[0]
	}

	/**
	 * `401`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
	 */
	export type Unauthorized = _HttpError<401>
	export namespace Unauthorized {
		export type Parameter = StaticErrorParameters<401>[0]
	}

	/**
	 * `402`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
	 */
	export type PaymentRequired = _HttpError<402>
	export namespace PaymentRequired {
		export type Parameter = StaticErrorParameters<402>[0]
	}

	/**
	 * `403`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
	 */
	export type Forbidden = _HttpError<403>
	export namespace Forbidden {
		export type Parameter = StaticErrorParameters<403>[0]
	}

	/**
	 * `404`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
	 */
	export type NotFound = _HttpError<404>
	export namespace NotFound {
		export type Parameter = StaticErrorParameters<404>[0]
	}

	/**
	 * `405`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
	 */
	export type MethodNotAllowed = _HttpError<405>
	export namespace MethodNotAllowed {
		export type Parameter = StaticErrorParameters<405>[0]
	}

	/**
	 * `406`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406
	 */
	export type NotAcceptable = _HttpError<406>
	export namespace NotAcceptable {
		export type Parameter = StaticErrorParameters<406>[0]
	}

	/**
	 * `407`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407
	 */
	export type ProxyAuthenticationRequired = _HttpError<407>
	export namespace ProxyAuthenticationRequired {
		export type Parameter = StaticErrorParameters<407>[0]
	}

	/**
	 * `408`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408
	 */
	export type RequestTimeout = _HttpError<408>
	export namespace RequestTimeout {
		export type Parameter = StaticErrorParameters<408>[0]
	}

	/**
	 * `409`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
	 */
	export type Conflict = _HttpError<409>
	export namespace Conflict {
		export type Parameter = StaticErrorParameters<409>[0]
	}

	/**
	 * `410`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410
	 */
	export type Gone = _HttpError<410>
	export namespace Gone {
		export type Parameter = StaticErrorParameters<410>[0]
	}

	/**
	 * `411`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411
	 */
	export type LengthRequired = _HttpError<411>
	export namespace LengthRequired {
		export type Parameter = StaticErrorParameters<411>[0]
	}

	/**
	 * `412`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412
	 */
	export type PreconditionFailed = _HttpError<412>
	export namespace PreconditionFailed {
		export type Parameter = StaticErrorParameters<412>[0]
	}

	/**
	 * `413`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413
	 */
	export type PayloadTooLarge = _HttpError<413>
	export namespace PayloadTooLarge {
		export type Parameter = StaticErrorParameters<413>[0]
	}

	/**
	 * `414`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414
	 */
	export type URITooLong = _HttpError<414>
	export namespace URITooLong {
		export type Parameter = StaticErrorParameters<414>[0]
	}

	/**
	 * `415`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415
	 */
	export type UnsupportedMediaType = _HttpError<415>
	export namespace UnsupportedMediaType {
		export type Parameter = StaticErrorParameters<415>[0]
	}

	/**
	 * `416`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416
	 */
	export type RequestedRangeNotSatisfiable = _HttpError<416>
	export namespace RequestedRangeNotSatisfiable {
		export type Parameter = StaticErrorParameters<416>[0]
	}

	/**
	 * `417`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417
	 */
	export type ExpectationFailed = _HttpError<417>
	export namespace ExpectationFailed {
		export type Parameter = StaticErrorParameters<417>[0]
	}

	/**
	 * `418`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
	 */
	export type ImATeapot = _HttpError<418>
	export namespace ImATeapot {
		export type Parameter = StaticErrorParameters<418>[0]
	}

	/**
	 * `421`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421
	 */
	export type MisdirectedRequest = _HttpError<421>
	export namespace MisdirectedRequest {
		export type Parameter = StaticErrorParameters<421>[0]
	}

	/**
	 * `422`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
	 */
	export type UnprocessableEntity = _HttpError<422>
	export namespace UnprocessableEntity {
		export type Parameter = StaticErrorParameters<422>[0]
	}

	/**
	 * `423`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423
	 */
	export type Locked = _HttpError<423>
	export namespace Locked {
		export type Parameter = StaticErrorParameters<423>[0]
	}

	/**
	 * `424`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424
	 */
	export type FailedDependency = _HttpError<424>
	export namespace FailedDependency {
		export type Parameter = StaticErrorParameters<424>[0]
	}

	/**
	 * `425`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425
	 */
	export type UnorderedCollection = _HttpError<425>
	export namespace UnorderedCollection {
		export type Parameter = StaticErrorParameters<425>[0]
	}

	/**
	 * `426`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426
	 */
	export type UpgradeRequired = _HttpError<426>
	export namespace UpgradeRequired {
		export type Parameter = StaticErrorParameters<426>[0]
	}

	/**
	 * `428`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428
	 */
	export type PreconditionRequired = _HttpError<428>
	export namespace PreconditionRequired {
		export type Parameter = StaticErrorParameters<428>[0]
	}

	/**
	 * `429`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429
	 */
	export type TooManyRequests = _HttpError<429>
	export namespace TooManyRequests {
		export type Parameter = StaticErrorParameters<429>[0]
	}

	/**
	 * `431`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431
	 */
	export type RequestHeaderFieldsTooLarge = _HttpError<431>
	export namespace RequestHeaderFieldsTooLarge {
		export type Parameter = StaticErrorParameters<431>[0]
	}

	/**
	 * `451`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451
	 */
	export type UnavailableForLegalReasons = _HttpError<451>
	export namespace UnavailableForLegalReasons {
		export type Parameter = StaticErrorParameters<451>[0]
	}

	/**
	 * `500`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
	 */
	export type InternalServerError = _HttpError<500>
	export namespace InternalServerError {
		export type Parameter = StaticErrorParameters<500>[0]
	}

	/**
	 * `501`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501
	 */
	export type NotImplemented = _HttpError<501>
	export namespace NotImplemented {
		export type Parameter = StaticErrorParameters<501>[0]
	}

	/**
	 * `502`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502
	 */
	export type BadGateway = _HttpError<502>
	export namespace BadGateway {
		export type Parameter = StaticErrorParameters<502>[0]
	}

	/**
	 * `503`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503
	 */
	export type ServiceUnavailable = _HttpError<503>
	export namespace ServiceUnavailable {
		export type Parameter = StaticErrorParameters<503>[0]
	}

	/**
	 * `504`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504
	 */
	export type GatewayTimeout = _HttpError<504>
	export namespace GatewayTimeout {
		export type Parameter = StaticErrorParameters<504>[0]
	}

	/**
	 * `505`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505
	 */
	export type HTTPVersionNotSupported = _HttpError<505>
	export namespace HTTPVersionNotSupported {
		export type Parameter = StaticErrorParameters<505>[0]
	}

	/**
	 * `506`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506
	 */
	export type VariantAlsoNegotiates = _HttpError<506>
	export namespace VariantAlsoNegotiates {
		export type Parameter = StaticErrorParameters<506>[0]
	}

	/**
	 * `507`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507
	 */
	export type InsufficientStorage = _HttpError<507>
	export namespace InsufficientStorage {
		export type Parameter = StaticErrorParameters<507>[0]
	}

	/**
	 * `508`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
	 */
	export type LoopDetected = _HttpError<508>
	export namespace LoopDetected {
		export type Parameter = StaticErrorParameters<508>[0]
	}

	/**
	 * `510`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510
	 */
	export type NotExtended = _HttpError<510>
	export namespace NotExtended {
		export type Parameter = StaticErrorParameters<510>[0]
	}

	/**
	 * `511`
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511
	 */
	export type NetworkAuthenticationRequired = _HttpError<511>
	export namespace NetworkAuthenticationRequired {
		export type Parameter = StaticErrorParameters<511>[0]
	}
}
// tslint:enable: no-shadowed-variable

export { _HttpError as HttpError }

/**
 * - Change the message parameter of Http errors to a more detailed object.
 * - Whitelist or widen status codes.
 * - Forbid the use of `HttpError` constructor (only allow static methods).
 * - Create custom errors with their own status code and augmented parameter.
 * @example
 * ```ts
 * declare module '＠tshttp/error' {
 *   namespace Augmentation {
 *     interface AnyHttpError {
 *       message?: string
 *       code: number
 *     }
 *
 *     interface Forbidden {
 *       access: 'read' | 'create' | 'update' | 'delete'
 *       target: string
 *     }
 *   }
 * }
 * ```
 * ---
 * @public
 */
export namespace Augmentation {
	/**
	 * Whitelist or widen status codes, and forbid the use of the `HttpError` constructor (only allow static methods).
	 * @example
	 * ```ts
	 * declare module '＠tshttp/error' {
	 *   namespace Augmentation {
	 *     interface Constraint {
	 *       status: 400 | 401 | 403 | 404 | 405 | 422 | 500
	 *       constructor: false
	 *     }
	 *   }
	 * }
	 * ```
	 */
	export interface Constraint {
		// status: number
		// constructor: never
	}

	/**
	 * Create custom errors with their own augmented parameter.
	 * @example
	 * ```ts
	 * declare module '＠tshttp/error' {
	 *   namespace Augmentation {
	 *     interface Constraint {
	 *       status: number
	 *     }
	 *
	 *     interface HttpErrors {
	 *       420: EnhanceYourCalm
	 *     }
	 *
	 *     interface EnhanceYourCalm extends AnyHttpError {
	 *       title: string
	 *       message: string
	 *     }
	 *   }
	 * }
	 * ```
	 */
	export interface HttpErrors extends Record<AvailableStatus | ErrorStatus, {}> {
		400: BadRequest
		401: Unauthorized
		402: PaymentRequired
		403: Forbidden
		404: NotFound
		405: MethodNotAllowed
		406: NotAcceptable
		407: ProxyAuthenticationRequired
		408: RequestTimeout
		409: Conflict
		410: Gone
		411: LengthRequired
		412: PreconditionFailed
		413: PayloadTooLarge
		414: URITooLong
		415: UnsupportedMediaType
		416: RequestedRangeNotSatisfiable
		417: ExpectationFailed
		418: ImATeapot
		421: MisdirectedRequest
		423: Locked
		424: FailedDependency
		425: UnorderedCollection
		426: UpgradeRequired
		428: PreconditionRequired
		429: TooManyRequests
		431: RequestHeaderFieldsTooLarge
		451: UnavailableForLegalReasons

		500: InternalServerError
		501: NotImplemented
		502: BadGateway
		503: ServiceUnavailable
		504: GatewayTimeout
		505: HTTPVersionNotSupported
		506: VariantAlsoNegotiates
		507: InsufficientStorage
		508: LoopDetected
		510: NotExtended
		511: NetworkAuthenticationRequired
	}

	/**
	 * Augment every error.
	 */
	export interface AnyHttpError {}

	/**
	 * Augment `400` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
	 */
	export interface BadRequest extends AnyHttpError {}

	/**
	 * Augment `401` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
	 */
	export interface Unauthorized extends AnyHttpError {}

	/**
	 * Augment `402` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
	 */
	export interface PaymentRequired extends AnyHttpError {}

	/**
	 * Augment `403` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
	 */
	export interface Forbidden extends AnyHttpError {}

	/**
	 * Augment `404` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
	 */
	export interface NotFound extends AnyHttpError {}

	/**
	 * Augment `405` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
	 */
	export interface MethodNotAllowed extends AnyHttpError {}

	/**
	 * Augment `406` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406
	 */
	export interface NotAcceptable extends AnyHttpError {}

	/**
	 * Augment `407` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407
	 */
	export interface ProxyAuthenticationRequired extends AnyHttpError {}

	/**
	 * Augment `408` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408
	 */
	export interface RequestTimeout extends AnyHttpError {}

	/**
	 * Augment `409` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
	 */
	export interface Conflict extends AnyHttpError {}

	/**
	 * Augment `410` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410
	 */
	export interface Gone extends AnyHttpError {}

	/**
	 * Augment `411` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411
	 */
	export interface LengthRequired extends AnyHttpError {}

	/**
	 * Augment `412` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412
	 */
	export interface PreconditionFailed extends AnyHttpError {}

	/**
	 * Augment `413` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413
	 */
	export interface PayloadTooLarge extends AnyHttpError {}

	/**
	 * Augment `414` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414
	 */
	export interface URITooLong extends AnyHttpError {}

	/**
	 * Augment `415` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415
	 */
	export interface UnsupportedMediaType extends AnyHttpError {}

	/**
	 * Augment `416` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416
	 */
	export interface RequestedRangeNotSatisfiable extends AnyHttpError {}

	/**
	 * Augment `417` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417
	 */
	export interface ExpectationFailed extends AnyHttpError {}

	/**
	 * Augment `418` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
	 */
	export interface ImATeapot extends AnyHttpError {}

	/**
	 * Augment `421` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421
	 */
	export interface MisdirectedRequest extends AnyHttpError {}

	/**
	 * Augment `422` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
	 */
	export interface UnprocessableEntity extends AnyHttpError {}

	/**
	 * Augment `423` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423
	 */
	export interface Locked extends AnyHttpError {}

	/**
	 * Augment `424` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424
	 */
	export interface FailedDependency extends AnyHttpError {}

	/**
	 * Augment `425` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425
	 */
	export interface UnorderedCollection extends AnyHttpError {}

	/**
	 * Augment `426` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426
	 */
	export interface UpgradeRequired extends AnyHttpError {}

	/**
	 * Augment `428` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428
	 */
	export interface PreconditionRequired extends AnyHttpError {}

	/**
	 * Augment `429` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429
	 */
	export interface TooManyRequests extends AnyHttpError {}

	/**
	 * Augment `431` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431
	 */
	export interface RequestHeaderFieldsTooLarge extends AnyHttpError {}

	/**
	 * Augment `451` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451
	 */
	export interface UnavailableForLegalReasons extends AnyHttpError {}

	/**
	 * Augment `500` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
	 */
	export interface InternalServerError extends AnyHttpError {}

	/**
	 * Augment `501` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501
	 */
	export interface NotImplemented extends AnyHttpError {}

	/**
	 * Augment `502` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502
	 */
	export interface BadGateway extends AnyHttpError {}

	/**
	 * Augment `503` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503
	 */
	export interface ServiceUnavailable extends AnyHttpError {}

	/**
	 * Augment `504` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504
	 */
	export interface GatewayTimeout extends AnyHttpError {}

	/**
	 * Augment `505` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505
	 */
	export interface HTTPVersionNotSupported extends AnyHttpError {}

	/**
	 * Augment `506` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506
	 */
	export interface VariantAlsoNegotiates extends AnyHttpError {}

	/**
	 * Augment `507` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507
	 */
	export interface InsufficientStorage extends AnyHttpError {}

	/**
	 * Augment `508` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
	 */
	export interface LoopDetected extends AnyHttpError {}

	/**
	 * Augment `510` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510
	 */
	export interface NotExtended extends AnyHttpError {}

	/**
	 * Augment `511` error.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511
	 */
	export interface NetworkAuthenticationRequired extends AnyHttpError {}
}
