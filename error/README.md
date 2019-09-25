# `@tshttp/error` 💢

The ultimate HTTP error to throw. **Neat** with a simple and small API surface, highly and precisely **typed**.

## Get started

```sh
yarn add @tshttp/error
npm install @tshttp/error
```

```ts
import HttpError from '@tshttp/error'

throw new HttpError(400)
throw new HttpError(500, 'My bad')
```

`HttpError` requires an known error status code as first argument.

You can pass a `message` of any form as a second argument, that will be stringified if necessary with the inherited `toString()` method.

The error `name` property will be inferred as the usual reason phrase associated with the code (e.g. "Not Found" for 404).

## Using status enum

If you prefer status names instead of status codes, you can use the `ErrorStatus` enum (or even the `Status` enum) from the companion lib [@tshttp/status](../status).

```ts
import HttpError from '@tshttp/error'
import Status, { ErrorStatus } from '@tshttp/status'

const someMiddleware = (req, res, next) => {
    throw new HttpError(ErrorStatus.BadRequest, 'foo is required')
}

const someOtherMiddleware = (req, res, next) => {
    const forbidden = new HttpError(Status.Forbidden, { tryTo: 'read', on: 'user' })
    next(forbidden)
}
```

## Hate the `new` keyword ?

You can instantiate `HttpError` with or without the `new` keyword, just like the built-in `Error` object.

```ts
throw HttpError(401)
```
