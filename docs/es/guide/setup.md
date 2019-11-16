# Preparación

El soporte de TypeScript para Nuxt principalmente viene a través de un módulo Nuxt, **@nuxt/typescript-build**.

Aquí están las pautas pata instalarlo y configurarlo.

## Instalación

```sh
yarn add --dev @nuxt/typescript-build
# o tambien
npm install --save-dev @nuxt/typescript-build
```

## Configuración

Todo lo que necesitas hacer es agregar **`@nuxt/typescript-build`** a tu **`buildModules`** en **`nuxt.config.js`**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

y crear un archivo **`tsconfig.json`** :

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "esnext",
      "esnext.asynciterable",
      "dom"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

::: tip
`@nuxt/typescript-build` ya contiene `@nuxt/types`, asi que no hay necesidad de instalarlo independientemente.
:::

::: tip

Checa la [documentación oficial de TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html) para aprender sobre las diferentes opciones del compilador.
:::

Y es todo! Ya estás listo para usar TypeScript en tus **layouts**, **components**, **plugins** y **middlewares**.

Puedes tambien checar la sección de [**Recetas de Cocina**](../cookbook/components/) para obtener algunas recetas usando TypeScript para tu proyecto con Nuxt.

## Opciónes de Modulo

### typeCheck

> Habilita la verificación de tipos de TypeScript en un proceso separado.

- Tipo: `Boolean` o `Object`
- Predeterminado: `true`

Cuando está habilitado, Nuxt.js usa [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) para proveer la verificación de tipos.

Puedes usar un `Object` para sobreescribir opciones del plugin o ponerlo en `false` para deshabilitarlo.

### ignoreNotFoundWarnings

> Habilita la repreción de advertencias de TypeScript de no encontrado.

- Tipo: `Boolean`
- Predeterminado: `false`

Cuando está habilotado, puedes reprimir las advertencias de tipo `export ... was not found ...`

Vea también sobre información de antecedentes [aquí](https://github.com/TypeStrong/ts-loader/issues/653).

**Advertencia:** Esta propiedad podría reprimir las advertencias que quieres ver. Ten cuidaddo en como lo configuras.

### Cargadores

> Personalizacion de las opciones del [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options)

- Tipo: `Object`

Si necesitas personalización extra del cargador de TypeScript, puedes personalizarlo para ambos archivos `ts` y `tsx` a traves de las opciones de módulo `loaders.ts` y `loaders.tsx`:

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
