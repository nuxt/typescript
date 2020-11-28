---
next: false
---

---
title: Server Middlewares (Runtime)
position: ''
description:  TypeScript Support for Nuxt.js
category: ''
---

```ts
import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Use req, res, next
}

export default myServerMiddleware
```
