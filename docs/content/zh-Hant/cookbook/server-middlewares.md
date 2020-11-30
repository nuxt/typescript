---
title: 伺服器渲染中介層 (Runtime)
position: 28
description: 'Nuxt.js 的 Typescript 支援'
category: '更多使用方式'
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // 使用 req, res, next
}

export default myServerMiddleware
```
