import { StatusU } from './union'
import { Status } from './status'

/**
 * The reason-phrase element exists for the sole purpose of providing a textual description associated
 * with the numeric status code, mostly out of deference to earlier Internet application protocols
 * that were more frequently used with interactive text clients.
 *
 * A client SHOULD ignore the reason-phrase content.
 *
 * @see https://tools.ietf.org/html/rfc7230#section-3.1.2
 * @see https://tools.ietf.org/html/rfc2616#section-6.1.1
 *
 * @public
 */
export function reason(status: StatusU): string {
	const phrase = Status[status]
	return phrase.replace(/(?!^)([A-Z])/gm, ' $1')
}
