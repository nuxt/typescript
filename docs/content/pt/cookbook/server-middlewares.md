---
title: Server Middlewares (Tempo de execução)
position: 28
description: 'Suporte de TypeScript para Nuxt.js'
category: 'Cookbook'
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Use req, res, next
}

export default myServerMiddleware
```
