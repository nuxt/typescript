---
title: 中介層
position: 23
description: 'Nuxt.js 的 Typescript 支援'
category: '更多使用方式'
---

```ts
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = (context) => {
  // 使用 context
}

export default myMiddleware
```
