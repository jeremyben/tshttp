import { RequestHeader, RequestHeaderU } from './request-header'
import { ResponseHeader, ResponseHeaderU } from './response-header'

export { RequestHeader, RequestHeaderU, ResponseHeader, ResponseHeaderU }

/**
 * HTTP headers allow the client and the server to pass additional information with the request or the response.
 * An HTTP header consists of its **case-insensitive** name followed by a colon `:`, then by its value (without line breaks).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 * @see https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
 *
 * @public
 */
const Header = <const>{
	...RequestHeader,
	...ResponseHeader,
}

type Header = RequestHeader | ResponseHeader

export default Header

/**
 * @public
 */
export type HeaderU = RequestHeaderU | ResponseHeaderU
