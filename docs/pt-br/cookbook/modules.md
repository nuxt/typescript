# Módulos (Tempo de execução)

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
