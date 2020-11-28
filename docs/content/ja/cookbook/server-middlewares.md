---
next: false
---

# Server Middlewares（ランタイム）

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // req, res, next を使用
}

export default myServerMiddleware
```
