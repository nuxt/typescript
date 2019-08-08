---
next: false
---

# Server Middlewares (Runtime)

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = (req, res, next) {
  // Use req, res, next
}

export default myServerMiddleware
```
