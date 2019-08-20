/**
 * Headers with additional information about the response, like its location or about the server itself (name and version etc.).
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Response_header
 *
 * @public
 */
export enum ResponseHeader {
	//
	// ═════════ CORS Response Headers ═════════
	//
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers

	/**
	 * Indicates whether the response can be shared.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
	 */
	AccessControlAllowOrigin = 'access-control-allow-origin',

	/**
	 * Indicates whether the response to the request can be exposed when the credentials flag is true.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
	 */
	AccessControlAllowCredentials = 'access-control-allow-credentials',

	/**
	 * Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
	 */
	AccessControlAllowHeaders = 'access-control-allow-headers',

	/**
	 * Specifies the method or methods allowed when accessing the resource in response to a preflight request.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods
	 */
	AccessControlAllowMethods = 'access-control-allow-methods',

	/**
	 * Indicates which headers can be exposed as part of the response by listing their names.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
	 */
	AccessControlExposeHeaders = 'access-control-expose-headers',

	/**
	 * Indicates how long the results of a preflight request can be cached.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
	 */
	AccessControlMaxAge = 'access-control-max-age',

	/**
	 * Used to remove the path restriction by including this header in the response of the serviceworker script.
	 * @see https://w3c.github.io/ServiceWorker/#path-restriction
	 * @see https://w3c.github.io/ServiceWorker/#service-worker-allowed
	 */
	ServiceWorkerAllowed = 'service-worker-allowed',

	/**
	 * Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API,
	 * which would otherwise be reported as zero due to cross-origin restrictions.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin
	 */
	TimingAllowOrigin = 'timing-allow-origin',

	/**
	 * Specifies if a cross-domain policy file (crossdomain.xml) is allowed. The file may define a policy to grant web clients,
	 * such as Adobe's Flash Player, Adobe Acrobat (PDF Reader), Microsoft Silverlight and Apache Flex,
	 * permission to handle data across domains that would otherwise be restricted due to the Same-Origin Policy.
	 * @see https://www.adobe.com/devnet/articles/crossdomain_policy_file_spec.html
	 * @see https://helmetjs.github.io/docs/crossdomain/
	 */
	XPermittedCrossDomainPolicies = 'x-permitted-cross-domain-policies',

	//
	// ═════════ Authentication ═════════
	//

	/**
	 * Defines the authentication method that should be used to gain access to a resource.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.47
	 */
	WwwAuthenticate = 'www-authenticate',

	/**
	 * Defines the authentication method that should be used to gain access to a resource behind a Proxy server.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.33
	 */
	ProxyAuthenticate = 'proxy-authenticate',

	//
	// ═════════ Caching ═════════
	//

	// General header
	/**
	 * Specifies directives for caching mechanisms in both requests and responses.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
	 */
	CacheControl = 'cache-control',

	// General header
	/**
	 * Implementation-specific header that may have various effects anywhere along the request-response chain.
	 * Used for backwards compatibility with HTTP/1.0 caches where the `Cache-Control` header is not yet present.
	 * @deprecated
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.32
	 */
	Pragma = 'pragma',

	/**
	 * The time in seconds the object has been in a proxy cache.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
	 */
	Age = 'age',

	/**
	 * Clears browsing data (e.g. cookies, storage, cache) associated with the requesting website.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data
	 */
	ClearSiteData = 'clear-site-data',

	// entity header ?
	/**
	 * The date/time after which the response is considered stale.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
	 */
	Expires = 'expires',

	//
	// ═════════ Request context ═════════
	//

	/**
	 * Governs which referrer information sent in the `Referer` header should be included with requests made.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	 * @see https://helmetjs.github.io/docs/referrer-policy/
	 */
	ReferrerPolicy = 'referrer-policy',

	//
	// ═════════ Response context ═════════
	//

	/**
	 * Contains information about the software used by the origin server to handle the request.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.38
	 */
	Server = 'server',

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
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
	 */
	ContentDisposition = 'content-disposition',

	//
	// ═════════ Redirects ═════════
	//

	/**
	 * Indicates the URL to redirect a page to.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location
	 */
	Location = 'location',

	//
	// ═════════ Proxies ═════════
	//

	// General header
	/**
	 * Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Via
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.45
	 */
	Via = 'via',

	//
	// ═════════ Conditionals ═════════
	//

	// entity header ?
	/**
	 * It is a validator, the last modification date of the resource, used to compare several versions of the same resource.
	 *
	 * It is less accurate than `ETag`, but easier to calculate in some environments.
	 * Conditional requests using `If-Modified-Since` and `If-Unmodified-Since` use this value
	 * to change the behavior of the request.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.29
	 */
	LastModified = 'last-modified',

	/**
	 * It is a validator, a unique string identifying the version of the resource.
	 * Conditional requests using `If-Match` and `If-None-Match` use this value to change the behavior of the request.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.19
	 */
	ETag = 'etag',

	/**
	 * Determines how to match future request headers to decide whether a cached response can be used
	 * rather than requesting a fresh one from the origin server.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary
	 */
	Vary = 'vary',

	//
	// ═════════ Range requests ═════════
	//

	/**
	 * Indicates if the server supports range requests, and if so in which unit the range can be expressed.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Ranges
	 */
	AcceptRanges = 'accept-ranges',

	//
	// ═════════ Transfer coding ═════════
	//

	// General header
	/**
	 * Specifies the form of encoding used to safely transfer the entity to the user.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.41
	 */
	TransferEncoding = 'transfer-encoding',

	// General header
	/**
	 * Allows the sender to include additional fields at the end of chunked message.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.40
	 */
	Trailer = 'trailer',

	//
	// ═════════ Cookies ═════════
	//

	/**
	 * Send cookies from the server to the user agent.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
	 */
	SetCookie = 'set-cookie',

	//
	// ═════════ Do Not Track ═════════
	//

	/**
	 * Indicates the tracking status that applied to the corresponding request.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Tk
	 */
	Tk = 'tk',

	//
	// ═════════ Connection management ═════════
	//

	// General header
	/**
	 * Controls whether the network connection stays open after the current transaction finishes.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.10
	 */
	Connection = 'connection',

	// General header
	/**
	 *
	 * Controls how long a persistent connection should stay open.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive
	 *
	 */
	KeepAlive = 'keep-alive',

	//
	// ═════════ Security ═════════
	//

	/**
	 * Prevents other domains from opening/controlling a window.
	 * (COOP)
	 * @see https://www.chromestatus.com/feature/5432089535053824
	 */
	CrossOriginOpenerPolicy = 'cross-origin-opener-policy',

	/**
	 * Prevents other domains from reading the response of the resources to which this header is applied.
	 * (CORP)
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
	 */
	CrossOriginResourcePolicy = 'cross-origin-resource-policy',

	/**
	 * Controls resources the user agent is allowed to load for a given page.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
	 * @see https://helmetjs.github.io/docs/csp/
	 */
	ContentSecurityPolicy = 'content-security-policy',

	/**
	 * Allows web developers to experiment with policies by monitoring, but not enforcing, their effects.
	 * These violation reports consist of JSON documents sent via an HTTP POST request to the specified URI.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
	 */
	ContentSecurityPolicyReportOnly = 'content-security-policy-report-only',

	/**
	 * Allows sites to opt in to reporting and/or enforcement of Certificate Transparency requirements,
	 * which prevents the use of misissued certificates for that site from going unnoticed.
	 * When a site enables the `Expect-CT` header, they are requesting that Chrome check
	 * that any certificate for that site appears in public CT logs.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT
	 * @see https://helmetjs.github.io/docs/expect-ct/
	 */
	ExpectCT = 'expect-ct',

	/**
	 * Provides a mechanism to allow and deny the use of browser features in its own frame,
	 * and in iframes that it embeds.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	 * @see https://helmetjs.github.io/docs/feature-policy/
	 */
	FeaturePolicy = 'feature-policy',

	/**
	 * Associates a specific cryptographic public key with a certain web server to decrease
	 * the risk of {@link https://developer.mozilla.org/en-US/docs/Glossary/MITM | MITM} attacks with forged certificates.
	 * (HPKP)
	 * @deprecated
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Public-Key-Pins
	 */
	PublicKeyPins = 'public-key-pins',

	/**
	 * Sends reports to the report-uri specified in the header and does still allow clients
	 * to connect to the server even if the pinning is violated.
	 * @deprecated
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Public-Key-Pins-Report-Only
	 */
	PublicKeyPinsReportOnly = 'public-key-pins-report-only',

	/**
	 * Force communication using HTTPS instead of HTTP.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	 * @see https://helmetjs.github.io/docs/hsts/
	 */
	StrictTransportSecurity = 'strict-transport-security',

	/**
	 * Disables MIME sniffing and forces browser to use the type given in `Content-Type`.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	 * @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
	 */
	XContentTypeOptions = 'x-content-type-options',

	/**
	 * Indicates that the browser (Internet Explorer) should not display the option
	 * to "Open" a file that has been downloaded from an application, to prevent phishing attacks
	 * as the file otherwise would gain access to execute in the context of the application.
	 * @deprecated
	 * @see https://helmetjs.github.io/docs/ienoopen/
	 */
	XDownloadOptions = 'x-download-options',

	/**
	 * Indicates whether a browser should be allowed to render a page in a `<frame>,` `<iframe>`, `<embed>` or `<object>`.
	 * (XFO)
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	 * @see https://helmetjs.github.io/docs/frameguard/
	 */
	XFrameOptions = 'x-frame-options',

	/**
	 * May be set by hosting environments or other frameworks and contains information
	 * about them while not providing any usefulness to the application or its visitors.
	 * Unset this header to avoid exposing potential vulnerabilities.
	 * @see https://helmetjs.github.io/docs/hide-powered-by/
	 */
	XPoweredBy = 'x-powered-by',

	/**
	 * Enables cross-site scripting filtering.
	 * @deprecated
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
	 * @see https://helmetjs.github.io/docs/xss-filter/
	 */
	XXSSProtection = 'x-xss-protection',

	//
	// ═════════ Other ═════════
	//

	// General header
	/**
	 * A general warning field containing information about possible problems.
	 * @deprecated
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Warning
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.46
	 */
	Warning = 'warning',

	// General header
	/**
	 * Contains the date and time at which the message was originated.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Date
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.18
	 */
	Date = 'date',

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
	 * @see https://tools.ietf.org/html/rfc7230#section-6.7
	 */
	Upgrade = 'upgrade',

	/**
	 * Specifies the patch document formats accepted by the server.
	 *
	 * Its presence in response to any method is an implicit indication
	 * that `PATCH` is allowed on the resource identified by the Request-URI.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Patch
	 */
	AcceptPatch = 'accept-patch',

	/**
	 * Used to list alternate ways to reach this service.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Alt-Svc
	 */
	AltSvc = 'alt-svc',

	/**
	 * Indicates how long the user agent should wait before making a follow-up request.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.37
	 */
	RetryAfter = 'retry-after',

	/**
	 * Controls DNS prefetching, a feature by which browsers proactively perform domain name resolution
	 * on both links that the user may choose to follow as well as URLs for items referenced
	 * by the document, including images, CSS, JavaScript, and so forth.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	 * @see https://helmetjs.github.io/docs/dns-prefetch-control/
	 */
	XDNSPrefetchControl = 'x-dns-prefetch-control',

	/**
	 * Links generated code to a source map.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/SourceMap
	 */
	SourceMap = 'sourcemap',

	/**
	 * Tells the browser that the page being loaded is going to want to perform a large allocation.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Large-Allocation
	 */
	LargeAllocation = 'large-allocation',

	/**
	 * Communicates one or more metrics and descriptions for the given request-response cycle.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing
	 */
	ServerTiming = 'server-timing',

	/**
	 * Recommends the preferred rendering engine (often a backward-compatibility mode)
	 * to use to display the content. Also used to activate Chrome Frame in Internet Explorer.
	 * @see https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-iedoco/380e2488-f5eb-4457-a07a-0cb1b6e4b4b5
	 */
	XUACompatible = 'x-ua-compatible',

	/**
	 * Used to indicate how a web page is to be indexed within public search engine results.
	 * The header is effectively equivalent to `<meta name="robots" content="...">`.
	 * @see https://developers.google.com/search/reference/robots_meta_tag
	 */
	XRobotsTag = 'x-robots-tag',

	//
	// ═════════ Entity Headers ═════════
	//

	/**
	 * Indicates the size of the entity-body, in decimal number of octets, sent to the recipient.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.13
	 */
	ContentLength = 'content-length',

	/**
	 * Indicates the media type of the resource.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
	 */
	ContentType = 'content-type',

	/**
	 * Used to specify the compression algorithm.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
	 */
	ContentEncoding = 'content-encoding',

	/**
	 * Describes the language(s) intended for the audience,
	 * so that it allows a user to differentiate according to the users' own preferred language.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.12
	 */
	ContentLanguage = 'content-language',

	/**
	 * Indicates an alternate location for the returned data.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Location
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.14
	 */
	ContentLocation = 'content-location',

	/**
	 * Indicates where in a full body message a partial message belongs.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.16
	 */
	ContentRange = 'content-range',

	/**
	 * MD5 digest of the entity-body for the purpose of providing
	 * an end-to-end message integrity check (MIC) of the entity-body.
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.15
	 */
	ContentMd5 = 'content-md5',

	/**
	 * Lists the set of HTTP request methods support by a resource.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Allow
	 * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.7
	 */
	Allow = 'allow',

	/**
	 * Provides a means for serialising one or more links in HTTP headers.
	 * It is semantically equivalent to the HTML `<link>` element.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link
	 */
	Link = 'link',
}

/**
 * @public
 */
export type ResponseHeaderU =
	| 'access-control-allow-origin'
	| 'access-control-allow-credentials'
	| 'access-control-allow-headers'
	| 'access-control-allow-methods'
	| 'access-control-expose-headers'
	| 'access-control-max-age'
	| 'service-worker-allowed'
	| 'timing-allow-origin'
	| 'x-permitted-cross-domain-policies'
	| 'www-authenticate'
	| 'proxy-authenticate'
	| 'cache-control'
	| 'pragma'
	| 'age'
	| 'clear-site-data'
	| 'expires'
	| 'referrer-policy'
	| 'server'
	| 'content-disposition'
	| 'location'
	| 'via'
	| 'last-modified'
	| 'etag'
	| 'vary'
	| 'accept-ranges'
	| 'transfer-encoding'
	| 'trailer'
	| 'set-cookie'
	| 'tk'
	| 'connection'
	| 'keep-alive'
	| 'cross-origin-opener-policy'
	| 'cross-origin-resource-policy'
	| 'content-security-policy'
	| 'content-security-policy-report-only'
	| 'expect-ct'
	| 'feature-policy'
	| 'public-key-pins'
	| 'public-key-pins-report-only'
	| 'strict-transport-security'
	| 'x-content-type-options'
	| 'x-download-options'
	| 'x-frame-options'
	| 'x-powered-by'
	| 'x-xss-protection'
	| 'warning'
	| 'date'
	| 'upgrade'
	| 'accept-patch'
	| 'alt-svc'
	| 'retry-after'
	| 'x-dns-prefetch-control'
	| 'sourcemap'
	| 'large-allocation'
	| 'server-timing'
	| 'x-ua-compatible'
	| 'x-robots-tag'
	| 'content-length'
	| 'content-type'
	| 'content-encoding'
	| 'content-language'
	| 'content-location'
	| 'content-range'
	| 'content-md5'
	| 'allow'
	| 'link'
