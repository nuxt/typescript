---
title: Modules (Runtime)
position: 27
description: TypeScript Support for Nuxt.js
category: Cookbook
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

Read more about [modules property](https://nuxtjs.org/docs/configuration-glossary/configuration-modules/), [modules dir](https://nuxtjs.org/docs/directory-structure/modules/). 
