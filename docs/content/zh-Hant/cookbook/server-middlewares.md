---
title: 伺服器渲染中介層 (Runtime)
position: 28
description: TypeScript Support for Nuxt.js
category: ''
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // 使用 req, res, next
}

export default myServerMiddleware
```
