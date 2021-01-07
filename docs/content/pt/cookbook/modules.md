---
title: Módulos (Tempo de execução)
position: 27
description: 'Suporte de TypeScript para Nuxt.js'
category: 'Cookbook'
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

// NECESSÁRIO se publicar o módulo como um pacote npm
// export const meta = require('./package.json')
```
