---
next: false
---

# 伺服器渲染中介層 (Runtime)

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // 使用 req, res, next
}

export default myServerMiddleware
```
