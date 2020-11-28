---
title: 服务器渲染中间件 (运行时)
position: 28
description: 'Nuxt.js 的 Typescript 支持'
category: '更多使用方式'
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // 使用 req, res, next
}

export default myServerMiddleware
```
