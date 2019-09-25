# `@tshttp/header` 📰

Ultra **typed**, over **documented**, and neatly **organised** HTTP header enums, to use for a great developper experience.

## Get started

```sh
yarn add @tshttp/header
npm install @tshttp/header
```

```ts
import Header from '@tshttp/header'

req.header(Header.ContentType)
```

## Categorized enums

`Header` enum is the default export and is composed of the following enums:

- `RequestHeader` for the HTTP request headers.
- `ResponseHeader` for the HTTP response headers.

```ts
import { RequestHeader, ResponseHeader } from '@tshttp/header'

req.get(RequestHeader.XForwardedFor)
res.set(ResponseHeader.Allow, 'GET')
```

## Unions

Union types are provided generically and for each category.
Simply add `U` to enums to get them.

```ts
import { HeaderU, ResponseHeaderU } from '@tshttp/status'

function setHeader(name: ResponseHeaderU, value: string) {
  //...
}
```
