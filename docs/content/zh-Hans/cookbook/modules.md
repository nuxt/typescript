---
title: 模块 (运行时)
position: 27
description: 'Nuxt.js 的 Typescript 支持'
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

// 如果要将这个模块发布成 npm 包，必须使用
// export const meta = require('./package.json')
```
