---
title: Server Middlewares (Tiempo de Ejecución)
position: 28
description: 'Soporte de Typescript para Nuxt.js'
category: 'Cookbook'
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Usa req, res, next
}

export default myServerMiddleware
```
