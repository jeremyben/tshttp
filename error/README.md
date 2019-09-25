# `@tshttp/error` 💢

The ultimate HTTP error to `throw`.<br>Neat with a **simple** and small API surface, highly **typed**.

## Get started

```sh
yarn add @tshttp/error
npm install @tshttp/error
```

```ts
import HttpError from '@tshttp/error'

throw new HttpError(400)
throw new HttpError(500, 'My bad') // with optional message
```

## `name` inference

HttpError requires an known error status code to accurately infer its `name` property: e.g. "Not Found" for 404.

If you bypass the compiler and use a unknown error status code, the error `name` will simply be "HTTP Error".

## `message` stringification

You can pass a `message` of any form as a second argument. It will be stringified if necessary, either in the error stack or with the `toString()` method.

```ts
throw new HttpError(400, {about: 'thing'})
```

gives the following stack trace :

```sh
Bad Request: {"about":"thing"} # instead of "Error: [Object object]"
    at ...
```

## Compatible with your framework

HttpError adds a `status` property that will be parsed, for example, by [Express](https://expressjs.com/) error handler to properly set the HTTP response status.

## Hate the `new` keyword ?

You can instantiate `HttpError` with or without the `new` keyword, just like the built-in `Error` object.

```ts
throw HttpError(401)
```

The compiler is okay with both.

## Status enum 💡

You want words instead of codes ? Use `ErrorStatus` enum from the companion library: **[@tshttp/status](../status)**.

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
