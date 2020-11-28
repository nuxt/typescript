---
title: Server Middlewares (Tiempo de Ejecución)
position: 28
description: TypeScript Support for Nuxt.js
category: ''
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Usa req, res, next
}

export default myServerMiddleware
```
