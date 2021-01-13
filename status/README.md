# `@tshttp/status` 🎰

Ultra **typed**, over **documented**, and neatly **organised** HTTP status enums, to use for a great developper experience.

## Get started

```sh
yarn add @tshttp/status
npm install @tshttp/status
```

```ts
import { Status } from '@tshttp/status'

res.sendStatus(Status.Created)
```

## Enums

`Status` enum is composed of the following exported enums:

- `InformationStatus` for **1xx** responses.
- `SuccessStatus` for **2xx** responses.
- `RedirectionStatus` for **3xx** responses.
- `ErrorStatus` for **4xx** and **5xx** responses.

```ts
import { ErrorStatus } from '@tshttp/status'
import { HttpError } from '@tshttp/error'

throw HttpError(ErrorStatus.Forbidden)
```

_These enums are actually object litterals with a `const` assertion.`_

## Unions

When use as a type, each category is a union of corresponding status codes.

```ts
import { RedirectionStatus } from '@tshttp/status'

function redirect(status: RedirectionStatus, url: string) {
  // ...
}
```

## Reason phrase

A simple method called `reason` transforms a status code into its human readable reason phrase :

```ts
import { reason, ErrorStatus } from '@tshttp/status'

reason(200) // "OK"
reason(301) // "Moved Permanently"
reason(404) // "Not Found"
reason(ErrorStatus.ImATeapot) // "I'm a teapot"
```
