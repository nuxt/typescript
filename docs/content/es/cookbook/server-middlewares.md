---
next: false
---

# Server Middlewares (Tiempo de Ejecución)

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Usa req, res, next
}

export default myServerMiddleware
```
