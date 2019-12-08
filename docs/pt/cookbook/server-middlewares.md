---
next: false
---

# Server Middlewares (Tempo de execução)

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Usar req, res, next
}

export default myServerMiddleware
```
