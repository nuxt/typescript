# Preparación

El soporte de Typescript en Nuxt viene principalmente mediante un módulo de Nuxt, **@nuxt/typescript-build**.

Aqui están las guias para instalar y configurarlo.

## Instalación

```sh
yarn add --dev @nuxt/typescript-build
# O
npm install --save-dev @nuxt/typescript-build
```

## Configuración

Todo lo que necesitas es agregar **`@nuxt/typescript-build`** a tus **`buildModules`** en **`nuxt.config.js`**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

y crear un archivo **`tsconfig.json`** :

<<< @/shared/tsconfig.json

::: tip
`@nuxt/typescript-build` incluye `@nuxt/types`, asi que no necesitas instalarlo de forma independiente.
:::

::: tip

Revisar la [documentación oficial de TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html) para aprender acerca de las diferentes opciones del compilador.
:::

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
