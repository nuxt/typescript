---
next: false
---

# Server Middlewares (Runtime)

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Usar req, res, next
}

export default myServerMiddleware
```
