---
title: Server Middlewares（ランタイム）
position: 28
description: TypeScript Support for Nuxt.js
category: ''
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // req, res, next を使用
}

export default myServerMiddleware
```
