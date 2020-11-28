---
next: false
---

# 服务器渲染中间件 (运行时)

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // 使用 req, res, next
}

export default myServerMiddleware
```
