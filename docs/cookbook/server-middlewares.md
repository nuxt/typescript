---
next: false
---

# Server Middlewares (Runtime)

```ts
import { RequestHandler } from 'express'

const myServerMiddleware: RequestHandler = (req, res, next) {
  // Use req, res, next
}

export default myServerMiddleware
```
