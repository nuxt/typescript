---
title: Preparación
position: 11
description: 'Soporte de Typescript para Nuxt.js'
category: Guía
---

El soporte de Typescript en Nuxt viene principalmente mediante un módulo de Nuxt, **@nuxt/typescript-build**.

Aqui están las guias para instalar y configurarlo.

## Instalación

<code-group>
<code-block label="Yarn" active>

```sh
yarn add --dev @nuxt/typescript-build @nuxt/types
```

</code-block>
<code-block label="NPM">

```sh
npm install --save-dev @nuxt/typescript-build @nuxt/types
```

</code-block>
</code-group>

<alert type="info">

**Types version**
Si usted quiere instalar versiones especifica de los types para coincidir con tu version de Nuxt que no es la más reciente :

```sh
yarn add --dev @nuxt/types@2.13.2
# OR
npm install --save-dev @nuxt/types@2.13.2
```

Si usted usa `nuxt-edge` :
```sh
yarn add --dev @nuxt/types@npm:@nuxt/types-edge
# OR
npm install --save-dev @nuxt/types@npm:@nuxt/types-edge
```

El versionamiento de los types coincide con el versionamiento de Nuxt desde la version [2.13.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.13.0).

</alert>

## Configuración

Todo lo que necesitas es agregar **`@nuxt/typescript-build`** a tus **`buildModules`** en **`nuxt.config.js`**

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

y crear un archivo **`tsconfig.json`** :

<inject-code query="shared/tsconfig.json"></inject-code>

<alert type="info">

Notese que el target **ES2018** es necesario para usar el [**Optional Chaining**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) y [**Nullish Coalescing**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing), porque el target **ESNext** parece no soportar estas funciones actualmente.

</alert>

Usted tambien debe proveer los types para los archivos de Vue añadiendo la siguiente declaracion de types:

```js{}[vue-shim.d.ts]
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

<alert type="info">

Usted puede poner este archivo en el directorio raiz de tu proyecto o en una carpeta llamada `types`. Usted tambien puede poner en un directorio personalizado, pero va tener que configurar el [`typeRoots`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types) en el archivo `tsconfig.json`.

</alert>

<alert type="info">

Revisar la [documentación oficial de TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html) para aprender acerca de las diferentes opciones del compilador.

</alert>

<alert type="warning">


Si usted esta usando Nuxt de forma personalizada con un framework de servidor personalizado, notesé que usted necesitara asegurarse de esperar que Nuxt este listo antes de construirlo:

```js

// Asegurarse de esperar a que Nuxt este listo para cargar @nuxt/typescript-build antes de proceder
await nuxt.ready()
...
if (config.dev) {
  const builder = new Builder(nuxt)
  await builder.build()
}
```

</alert>


Eso es todo, ya todo esta listo para usar Typescript en tus **layouts**, **componentes**, **plugins** y **middlewares**.

Usted puede revisar la sección del [**CookBook**](../cookbook/components/) para ver algunos ejemplos de TypeScript para tus proyectos de Nuxt.

## Opciones del módulo

### typeCheck

> Activa la comprobación de tipos de Typescript en un proceso separado.

- Tipo: `Boolean` o `Object`
- Defecto: `true`

Cuando esta activado, Nuxt.js usa [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) para proveer la comprobación de los tipos.

Usted puede usar un `Object` para reemplazar las opciones del plugins or asignar con un `false` para desactivarlo.

### ignoreNotFoundWarnings

> Permite suprimir advertencias de typescript: not found.

- Tipo: `Boolean`
- Defecto: `false`

Cuando esta activado, puedes suprimir las advertencias  `export ... was not found ...`.

Puedes ver los antecedentes [aqui](https://github.com/TypeStrong/ts-loader/issues/653).
 
**Advertencia:** Esta propiedad puede suprimir las advertencias que desea ver. Tenga cuidado como lo configura.

### loaders

> Customizacion de las opciones de [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options)

- Tipo: `Object`

Si necesita customizar el loader de Typescript, puedes customizar ambos archivos `ts` & `tsx` mediante las opciones del módulo: `loaders.ts` & `loaders.tsx`:

```ts
loaders: {
  ts: {
    silent: true
  },
  tsx: {
    silent: true
  }
}
```
