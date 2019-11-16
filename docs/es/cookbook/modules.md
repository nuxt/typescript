# Modules (Tiempo de Ejecución)

```ts
import { Module } from '@nuxt/types'

interface Options {
  a: boolean
  b: number
  c: string
}

const myModule: Module<Options> = function (moduleOptions) {
  // Usa this, this.options, this.nuxt
  // Usa moduleOptions
}

export default myModule

// REQUERIDO si se publica el módulo como un paquete de npm.
// export const meta = require('./package.json')
```
