---
title: Server Middlewares (Tempo de execução)
position: 28
description: 'Suporte de Typescript para Nuxt.js'
category: 'Cookbook'
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Usar req, res, next
}

export default myServerMiddleware
```
