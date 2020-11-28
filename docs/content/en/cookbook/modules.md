---
title: Modules (Runtime)
position: ''
description:  TypeScript Support for Nuxt.js
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
  // Use this, this.options, this.nuxt
  // Use moduleOptions
}

export default myModule

// REQUIRED if publishing the module as npm package
// export const meta = require('./package.json')
```
