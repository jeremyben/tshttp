# `@tshttp/status` 🎰

Ultra **typed**, over **documented**, and neatly **organised** HTTP status enums, to use for a great developper experience.

## Get started

```sh
yarn add @tshttp/status
npm install @tshttp/status
```

```ts
import Status from '@tshttp/status'

res.sendStatus(Status.Created)
```

## Categorized enums

`Status` enum is the default export and is composed of the following enums :

- `InformationStatus` for **1xx** responses.
- `SuccessStatus` for **2xx** responses.
- `RedirectionStatus` for **3xx** responses.
- `ErrorStatus` for **4xx** and **5xx** responses.

```ts
import { ErrorStatus } from '@tshttp/status'
import HttpError from '@tshttp/error'

throw HttpError(ErrorStatus.Forbidden)
```

## Unions

Union types are provided generically and for each category.
Simply add `U` to enums to get them.

```ts
import { StatusU, RedirectionStatusU } from '@tshttp/status'

function redirect(status: RedirectionStatusU, url: string) {
  // ...
}
```

## Reason phrase

A simple method called `reason` transforms a status code into its human readable reason phrase :

```ts
import { reason, ErrorStatus} from '@tshttp/status'

reason(200) // "OK"
reason(301) // "Moved Permanently"
reason(404) // "Not Found"
reason(ErrorStatus.ImATeapot) // "I'm a teapot"
```
