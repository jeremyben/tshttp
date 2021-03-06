/**
 * Headers containing more information about the resource to be fetched or about the client itself.
 *
 * https://developer.mozilla.org/en-US/docs/Glossary/Request_header
 *
 * @public
 */
export const RequestHeader = <const>{
	//
	// ═════════ CORS Request Headers ═════════
	//
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_request_headers

	/**
	 * Used when issuing a preflight request to let the server know which HTTP headers will be used
	 * when the actual request is made.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers
	 */
	AccessControlRequestHeaders: 'access-control-request-headers',

	/**
	 * Used when issuing a preflight request to let the server know which HTTP method will be used
	 * when the actual request is made.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method
	 */
	AccessControlRequestMethod: 'access-control-request-method',

	/**
	 * Indicates where a fetch originates from.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin
	 */
	Origin: 'origin',

	//
	// ═════════ Authentication ═════════
	//

	/**
	 * Contains the credentials to authenticate a user agent with a server.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.8
	 */
	Authorization: 'authorization',

	/**
	 * Contains the credentials to authenticate a user agent with a proxy server.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authorization
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.34
	 */
	ProxyAuthorization: 'proxy-authorization',

	//
	// ═════════ Content negotiation ═════════
	//
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation

	/**
	 * Informs the server about the types of data that can be sent back. It is MIME-type.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
	 */
	Accept: 'accept',

	/**
	 * Informs the server about which character set the client is able to understand.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Charset
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2
	 */
	AcceptCharset: 'accept-charset',

	/**
	 * Informs the server about the encoding algorithm, usually a compression algorithm,
	 * that can be used on the resource sent back.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
	 */
	AcceptEncoding: 'accept-encoding',

	/**
	 * Informs the server about the language the server is expected to send back.
	 * This is a hint and is not necessarily under the full control of the user:
	 * the server should always pay attention not to override an explicit user choice
	 * (like selecting a language in a drop down list).
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
	 */
	AcceptLanguage: 'accept-language',

	//
	// ═════════ Caching ═════════
	//

	// General header
	/**
	 * Specifies directives for caching mechanisms in both requests and responses.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
	 */
	CacheControl: 'cache-control',

	// General header
	/**
	 * Implementation-specific header that may have various effects anywhere along the request-response chain.
	 * Used for backwards compatibility with HTTP/1.0 caches where the `Cache-Control` header is not yet present.
	 * @deprecated
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.32
	 */
	Pragma: 'pragma',

	//
	// ═════════ Transfer coding ═════════
	//

	/**
	 * Specifies the transfer encodings the user agent is willing to accept.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/TE
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.39
	 */
	TE: 'te',

	//
	// ═════════ Request context ═════════
	//

	/**
	 * Contains an Internet email address for a human user who controls the requesting user agent.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/From
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.22
	 */
	From: 'from',

	/**
	 * Specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.23
	 */
	Host: 'host',

	/**
	 * The address of the previous web page from which a link to the currently requested page was followed.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.36
	 */
	Referer: 'referer',

	/**
	 * Contains a characteristic string that allows the network protocol peers to identify
	 * the application type, operating system, software vendor or software version
	 * of the requesting software user agent.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.43
	 */
	UserAgent: 'user-agent',

	//
	// ═════════ Controls ═════════
	//

	/**
	 * Indicates expectations that need to be fulfilled by the server in order to properly handle the request.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.20
	 */
	Expect: 'expect',

	/**
	 * Provides a mechanism with the `TRACE` and `OPTIONS` methods to limit the number
	 * of proxies or gateways that can forward the request to the next inbound server.
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.31
	 */
	MaxForwards: 'max-forwards',

	//
	// ═════════ Proxies ═════════
	//

	/**
	 * Contains information from the client-facing side of proxy servers
	 * that is altered or lost when a proxy is involved in the path of the request.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded
	 */
	Forwarded: 'forwarded',

	/**
	 * Identifies the originating IP addresses of a client connecting to a web server
	 * through an HTTP proxy or a load balancer.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
	 */
	XForwardedFor: 'x-forwarded-for',

	/**
	 * Identifies the original host requested that a client used to connect to your proxy or load balancer.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host
	 */
	XForwardedHost: 'x-forwarded-host',

	/**
	 * Identifies the protocol (HTTP or HTTPS) that a client used to connect to your proxy or load balancer.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto
	 */
	XForwardedProto: 'x-forwarded-proto',

	// General header
	/**
	 * Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Via
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.45
	 */
	Via: 'via',

	//
	// ═════════ Conditionals ═════════
	//

	/**
	 * Makes the request conditional and applies the method only if the stored resource matches one of the given ETags.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match
	 */
	IfMatch: 'if-match',

	/**
	 * Makes the request conditional and applies the method only if the stored resource doesn't match any of the given ETags.
	 *
	 * This is used to update caches (for safe requests), or to prevent to upload a new resource when one is already existing.
	 *
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match
	 */
	IfNoneMatch: 'if-none-match',

	/**
	 * Makes the request conditional and expects the entity to be transmitted only if it has been modified after the given date.
	 *
	 * This is used to transmit data only when the cache is out of date.
	 *
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since
	 */
	IfModifiedSince: 'if-modified-since',

	/**
	 * Makes the request conditional and expects the entity to be transmitted only if it has not been modified after the given date.
	 *
	 * This is used to ensure the coherence of a new fragment of a specific range with previous ones,
	 * or to implement an optimistic concurrency control system when modifying existing documents.
	 *
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since
	 */
	IfUnmodifiedSince: 'if-unmodified-since',

	//
	// ═════════ Range requests ═════════
	//

	/**
	 * Indicates the part of a document that the server should return.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35
	 */
	Range: 'range',

	/**
	 * Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource.
	 * Used to prevent downloading two ranges from incompatible version of the resource.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Range
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.27
	 */
	IfRange: 'if-range',

	//
	// ═════════ Cookies ═════════
	//

	/**
	 * Contains stored HTTP cookies previously sent by the server with the `Set-Cookie` header.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie
	 */
	Cookie: 'cookie',

	//
	// ═════════ Do Not Track ═════════
	//

	/**
	 * Used for expressing the user's tracking preference.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT
	 */
	DNT: 'dnt',

	//
	// ═════════ Connection management ═════════
	//

	// General header
	/**
	 * Controls whether the network connection stays open after the current transaction finishes.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.10
	 */
	Connection: 'connection',

	// General header
	/**
	 *
	 * Controls how long a persistent connection should stay open.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive
	 *
	 */
	KeepAlive: 'keep-alive',

	//
	// ═════════ Downloads ═════════
	//

	// General header
	/**
	 * Is a response header if the resource transmitted should be displayed `inline`
	 * (default behavior when the header is not present),
	 * or it should be handled like a download or `attachment` and the browser should present a 'Save As' window.
	 *
	 * Is a general header when used on the subpart of a multipart body to give information about the field it applies to.
	 *
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
	 */
	ContentDisposition: 'content-disposition',

	//
	// ═════════ Security ═════════
	//

	/**
	 * Sends a signal to the server expressing the client’s preference for an encrypted and authenticated response,
	 * and that it can successfully handle the `upgrade-insecure-requests` directive.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade-Insecure-Requests
	 */
	UpgradeInsecureRequests: 'upgrade-insecure-requests',

	/**
	 * Mainly used to identify Ajax requests. Most JavaScript frameworks send this field with value of XMLHttpRequest.
	 */
	XRequestedWith: 'x-requested-with',

	/**
	 * Used to prevent cross-site request forgery.
	 *
	 * https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token
	 */
	XCSRFToken: 'x-csrf-token',

	//
	// ═════════ Client Hints ═════════
	//

	/**
	 * Indicates the user agent's preference for reduced data usage.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data
	 */
	SaveData: 'save-data',

	//
	// ═════════ Other ═════════
	//

	// General header
	/**
	 * A general warning field containing information about possible problems.
	 * @deprecated
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Warning
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.46
	 */
	Warning: 'warning',

	// General header
	/**
	 * Contains the date and time at which the message was originated.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Date
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.18
	 */
	Date: 'date',

	// General header
	/**
	 * The standard establishes rules for upgrading or changing to a different protocol on the current client, server, transport protocol connection.
	 *
	 * For example, this header standard allows a client to change from HTTP 1.1 to HTTP 2.0,
	 * assuming the server decides to acknowledge and implement the Upgrade header field.
	 * Neither party is required to accept the terms specified in the Upgrade header field.
	 *
	 * It can be used in both client and server headers. If the Upgrade header field is specified,
	 * then the sender MUST also send the Connection header field with the upgrade option specified.
	 *
	 *
	 * https://tools.ietf.org/html/rfc7230#section-6.7
	 */
	Upgrade: 'upgrade',

	/**
	 * Requests a web application to override the method specified in the request (typically `POST`)
	 * with the method given in the header field (typically `PUT` or `DELETE`).
	 *
	 * This can be used when a user agent or firewall prevents `PUT` or `DELETE` methods from being sent directly
	 * (note that this is either a bug in the software component, which ought to be fixed,
	 * or an intentional configuration, in which case bypassing it may be the wrong thing to do).
	 *
	 *
	 * https://opensocial.github.io/spec/2.5.1/Core-API-Server.xml#rfc.section.2.1.1.1
	 */
	XHttpMethodOverride: 'x-http-method-override',

	/**
	 * Connection-specific header field that includes parameters that govern the HTTP/2 connection,
	 * provided in anticipation of the server accepting the request to upgrade from HTTP/1.1 to HTTP/2.
	 *
	 * https://httpwg.org/specs/rfc7540.html#Http2SettingsHeader
	 */
	Http2Settings: 'http2-settings',

	//
	// ═════════ Entity Headers ═════════
	//

	/**
	 * Indicates the size of the entity-body, in decimal number of octets, sent to the recipient.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.13
	 */
	ContentLength: 'content-length',

	/**
	 * Indicates the media type of the resource.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
	 */
	ContentType: 'content-type',

	/**
	 * MD5 digest of the entity-body for the purpose of providing
	 * an end-to-end message integrity check (MIC) of the entity-body.
	 *
	 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.15
	 */
	ContentMd5: 'content-md5',
}

export type RequestHeader = typeof RequestHeader[keyof typeof RequestHeader]
