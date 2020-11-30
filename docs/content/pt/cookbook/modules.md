---
title: Módulos (Tempo de execução)
position: 27
description: 'Suporte de Typescript para Nuxt.js'
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
  // Usar this, this.options, this.nuxt
  // Usar moduleOptions
}

export default myModule

// NECESSÁRIO se publicar o módulo como pacote npm
// export const meta = require('./package.json')
```
