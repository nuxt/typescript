---
next: false
---

# Server Middlewares（ランタイム）

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Use req, res, next
}

export default myServerMiddleware
```
