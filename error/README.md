# `@tshttp/error` 💢

The ultimate HTTP error to `throw`.<br>Built with a simple and discoverable API surface, highly **typed**, with [augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) in mind.

## Get started

_Requires at least typescript 4.0._

```sh
yarn add @tshttp/error
npm install @tshttp/error
```

```ts
import { HttpError } from '@tshttp/error'

throw new HttpError(400)
throw new HttpError(500, 'My bad')
```

## Attached properties

### `status`

The resulting error has a `status` property that will be used, for example by [Express](https://expressjs.com/) and [Fastify](https://www.fastify.io/) error handlers, to properly set the HTTP response status.

### `name`

The resulting error `name` property will be inferred from `status`: e.g. "NotFound" for 404.

_If you use a unknown error status code, the error `name` will be "HttpError"._

### Need more?

Have a look at the [Augmentations section](#augmentations).

### Enumerability

To respect the inherited `Error`, non-enumerable properties are kept non-enumerable: `name`, `message`, `stack`.<br>They won't be serialized by `JSON.stringify` ([MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)).

## Dedicated static methods

Instead of passing the status code, the known HTTP errors are exposed as static methods: [List of HTTP errors](#list-of-http-errors).

```ts
throw HttpError.Unauthorized('Get out')
// HttpError { status: 400, name: 'Unauthorized', message: 'Get out' }

throw HttpError.InternalServerError('My bad') 
// HttpError { status: 500, name: 'InternalServerError', message: 'My bad' }
```

## Optional `new` keyword

You can instantiate `HttpError` with or without the `new` keyword, just like the built-in `Error` constructor.

```ts
throw HttpError(401)
```

The compiler is okay with both. 👌

## Augmentations

By default, the only parameter you can pass besides the status code is `message?: string`. You might want your error objects to have more details.

A dedicated namespace `Augmentation` gives the possibility, for each different status, to change the optional `message` parameter to a required `data` object parameter. This object's properties will be **attached** to the resulting error (at runtime **and** compile time).

```ts
export {} // necessary to be in a module file

declare module '@tshttp/error' {
  namespace Augmentation {
    interface Forbidden {
      access: 'read' | 'create' | 'update' | 'delete'
      target: string
    }

    // Could be useful for custom headers since frameworks usually set the response headers with the error headers property:
    interface MethodNotAllowed {
      headers: {
        allow: ('GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE')[]
      }
    }
  }
}

throw HttpError(403, { access: 'read', target: 'user' })
// HttpError { status: 400, name: 'Forbidden', access: 'read', target: 'user' }

throw HttpError.MethodNotAllowed({ headers: { allow: ['GET'] } })
// HttpError { status: 505, name: 'MethodNotAllowed', headers: { allow: ['GET'] } }
```

Every known HTTP error is available for augmentation under its own name: [List of HTTP errors](#list-of-http-errors).

_If you want to augment every HTTP error at once, use the `AnyHttpError` interface._

### Constraint

With the `Constraint` interface, you can:

- Whitelist the errors you application uses.

```ts
declare module '@tshttp/error' {
  namespace Augmentation {
    interface Constraint {
      status: 400 | 401 | 403 | 404 | 405 | 422 | 500
      // or widen to all numbers with `status: number`
    }
  }
}
```

- Force usage of static methods.

```ts
declare module '@tshttp/error' {
  namespace Augmentation {
    interface Constraint {
      constructor: false
    }
  }
}

HttpError(400) // Compile time error
HttpError.BadRequest() // Ok
```

### `message` property stringification

If you define a `message` property with different type than `string`, like so:

```ts
declare module '@tshttp/error' {
  namespace Augmentation {
    interface AnyHttpError {
      message: Record<string, any>
    }
  }
}
```

it will always be stringified to respect the original `Error` interface (at runtime **and** compile time).

So:

```ts
throw HttpError(400, { message: { about: 'thing' } })
```

gives the following stack trace:

```sh
BadRequest: {"about":"thing"} # instead of "BadRequest: [Object object]"
    at ...
```
### Protections

Since these augmentations affect the error object itself, you cannot define the following properties: 
`name`,	`status`,	`stack`, `__proto__`, `constructor`,	`prototype`.

## List of HTTP errors

| Status | Name                            |
|--------|---------------------------------|
| `400`  | `BadRequest`                    |
| `401`  | `Unauthorized`                  |
| `402`  | `PaymentRequired`               |
| `403`  | `Forbidden`                     |
| `404`  | `NotFound`                      |
| `405`  | `MethodNotAllowed`              |
| `406`  | `NotAcceptable`                 |
| `407`  | `ProxyAuthenticationRequired`   |
| `408`  | `RequestTimeout`                |
| `409`  | `Conflict`                      |
| `410`  | `Gone`                          |
| `411`  | `LengthRequired`                |
| `412`  | `PreconditionFailed`            |
| `413`  | `PayloadTooLarge`               |
| `414`  | `URITooLong`                    |
| `415`  | `UnsupportedMediaType`          |
| `416`  | `RequestedRangeNotSatisfiable`  |
| `417`  | `ExpectationFailed`             |
| `418`  | `ImATeapot`                     |
| `421`  | `MisdirectedRequest`            |
| `422`  | `UnprocessableEntity`           |
| `423`  | `Locked`                        |
| `424`  | `FailedDependency`              |
| `425`  | `UnorderedCollection`           |
| `426`  | `UpgradeRequired`               |
| `428`  | `PreconditionRequired`          |
| `429`  | `TooManyRequests`               |
| `431`  | `RequestHeaderFieldsTooLarge`   |
| `451`  | `UnavailableForLegalReasons`    |
| `500`  | `InternalServerError`           |
| `501`  | `NotImplemented`                |
| `502`  | `BadGateway`                    |
| `503`  | `ServiceUnavailable`            |
| `504`  | `GatewayTimeout`                |
| `505`  | `HTTPVersionNotSupported`       |
| `506`  | `VariantAlsoNegotiates`         |
| `507`  | `InsufficientStorage`           |
| `508`  | `LoopDetected`                  |
| `509`  | `BandwidthLimitExceeded`        |
| `510`  | `NotExtended`                   |
| `511`  | `NetworkAuthenticationRequired` |