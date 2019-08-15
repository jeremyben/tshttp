/**
 * @public
 */
export type InformationStatusU = 100 | 101 | 102 | 103

/**
 * @public
 */
export type SuccessStatusU = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226

/**
 * @public
 */
export type RedirectionStatusU = 300 | 301 | 302 | 303 | 304 | 307 | 308

/**
 * @public
 */
export type ErrorStatusU =
	| 400
	| 401
	| 402
	| 403
	| 404
	| 405
	| 406
	| 407
	| 408
	| 409
	| 410
	| 411
	| 412
	| 413
	| 414
	| 415
	| 416
	| 417
	| 418
	| 421
	| 422
	| 423
	| 424
	| 425
	| 426
	| 428
	| 429
	| 431
	| 451
	| 500
	| 501
	| 502
	| 503
	| 504
	| 505
	| 506
	| 507
	| 508
	| 510
	| 511

/**
 * @public
 */
export type StatusU = InformationStatusU | SuccessStatusU | RedirectionStatusU | ErrorStatusU
