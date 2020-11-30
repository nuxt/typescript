---
title: Tiempo de Ejecución (opcional)
position: 12
description: 'Soporte de Typescript para Nuxt.js'
category: Guía
---

TypeScript en tiempo de ejecución es requerido para archivos que no son compilados por Webpack como lo es el archivo **nuxt.config**, **modules** locales y **serverMiddlewares**

Nuxt.js ha creado un envolvente de TypeScript en tiempo de ejecución bajo un paquete dedicado **`@nuxt/typescript-runtime`**. El envolventes es un binario llamado **nuxt-ts** que registra [**ts-node**](https://github.com/TypeStrong/ts-node) detrás de escena antes de correrlo.

## Instalación

<code-group>
<code-block label="Yarn" active>

```sh
yarn add @nuxt/typescript-runtime
```

</code-block>
<code-block label="NPM">

```sh
npm install @nuxt/typescript-runtime
```

</code-block>
</code-group>

<alert type="info">

Nota este paquete es instalado como `dependency` y no como `devDependency` igual a `@nuxt/typescript-build`, porque `@nuxt/typescript-runtime` es necesario en producción.

</alert>

## Uso

Todo lo que necesitas es actualizar tu archivo **package.json**:

```json{2-5}
"scripts": {
  "dev": "nuxt-ts",
  "build": "nuxt-ts build",
  "generate": "nuxt-ts generate",
  "start": "nuxt-ts start"
},
"dependencies": {
  "@nuxt/typescript-runtime": "latest",
  "nuxt": "latest",
},
"devDependencies": {
  "@nuxt/types": "latest",
  "@nuxt/typescript-build": "latest"
}
```

<alert type="info">

**nuxt-ts** tambien funciona si usted esta usando la version edge de Nuxt.js (**nuxt-edge**).

</alert>

Usted puede ahora usar TypeScript para el archivo **nuxt.config**, **modulos** locales y **serverMiddlewares**.

<alert type="warning">


`@nuxt/typescript-runtime` no soporta uso programado (como esto extiende de `@nuxt/cli`).

Los usuarios avanzados pueden intentar agregar el siguiente código al punto de entrada de su servidor (ver [fuente](https://github.com/nuxt/typescript/blob/master/packages/typescript-runtime/src/index.ts)):

```js
import { register } from 'ts-node'

register({
  project: 'tsconfig.json',
  compilerOptions: {
    module: 'commonjs'
  },
  transpileOnly: true
})
```

Igualmente, esto es **no recomendado o soportado**.

</alert>
