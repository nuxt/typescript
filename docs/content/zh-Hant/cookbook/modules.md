---
title: 模組 (Runtime)
position: 27
description: 'Nuxt.js 的 Typescript 支援'
category: '更多使用方式'
---

```ts
import { Module } from '@nuxt/types'

interface Options {
  a: boolean
  b: number
  c: string
}

const myModule: Module<Options> = function (moduleOptions) {
  // 使用 this, this.options, this.nuxt
  // 使用 moduleOptions
}

export default myModule

// 如果要將這個模組發佈成 npm 套件時，必要使用
// export const meta = require('./package.json')
```
