# `@tshttp/header` 📰

Ultra **typed**, over **documented**, and neatly **organised** HTTP header enums, to use for a great developper experience.

## Get started

```sh
yarn add @tshttp/header
npm install @tshttp/header
```

```ts
import { Header } from '@tshttp/header'

req.header(Header.ContentType)
```

## Enums

`Header` enum is composed of the following exported enums:

- `RequestHeader` for the HTTP request headers.
- `ResponseHeader` for the HTTP response headers.

```ts
import { RequestHeader, ResponseHeader } from '@tshttp/header'

req.get(RequestHeader.XForwardedFor)
res.set(ResponseHeader.Allow, 'GET')
```

_These enums are actually object litterals with a `const` assertion.`_

## Unions

When use as a type, each category is a union of corresponding headers.

```ts
import { Header, ResponseHeader } from '@tshttp/status'

function setHeader(name: ResponseHeader, value: string) {
  //...
}
```
