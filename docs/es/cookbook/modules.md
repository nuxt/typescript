# Modulos (Runtime)

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

// REQUERIDO si usted va a publicar el módulo como un paquete de npm
// export const meta = require('./package.json')
```
