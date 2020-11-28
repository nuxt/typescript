---
title: モジュール（ランタイム）
position: 27
description: TypeScript Support for Nuxt.js
category: ''
---

```ts
import { Module } from '@nuxt/types'

interface Options {
  a: boolean
  b: number
  c: string
}

const myModule: Module<Options> = function (moduleOptions) {
  // this、this.options、this.nuxt を使用します
  // moduleOptions を使用します
}

export default myModule

// モジュールを npm パッケージとして公開する場合は必須
// export const meta = require('./package.json')
```
