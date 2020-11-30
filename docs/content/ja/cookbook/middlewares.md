---
title: ミドルウェア
position: 23
description: 'Nuxt.js 向け TypeScript サポート'
category: 'Cookbook'
---

```ts
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = (context) => {
  // context を使用します
}

export default myMiddleware
```
