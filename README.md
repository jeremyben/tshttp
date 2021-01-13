# tshttp 🧱

_Low-Level_ TypeScript HTTP-related Modules. Inspired by [jshttp](https://jshttp.github.io/).

## Modules

### [@tshttp/status](./status)

```ts
import { Status } from '@tshttp/status'

res.status(Status.Created)
```

---

### [@tshttp/header](./header)

```ts
import { ResponseHeader } from '@tshttp/header'

res.set(ResponseHeader.ContentType, 'application/json')
```

---

### [@tshttp/error](./error)

```ts
import { HttpError } from '@tshttp/error'

throw HttpError(400, 'Nope')
throw HttpError.Forbidden('Access Denied')
```
