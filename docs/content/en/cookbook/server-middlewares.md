---
title: Server Middlewares (Runtime)
position: 28
description: TypeScript Support for Nuxt.js
category: Cookbook
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Use req, res, next
}

export default myServerMiddleware
```
