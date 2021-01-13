import { RequestHeader } from './request-header'
import { ResponseHeader } from './response-header'

export { RequestHeader, ResponseHeader }

/**
 * HTTP headers allow the client and the server to pass additional information with the request or the response.
 * An HTTP header consists of its **case-insensitive** name followed by a colon `:`, then by its value (without line breaks).
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 *
 * https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
 *
 * @public
 */
export const Header = <const>{
	...RequestHeader,
	...ResponseHeader,
}

export type Header = RequestHeader | ResponseHeader
