---
prev: false
---

# Migracion desde Nuxt 2.8

El soporte de Typescript ha sido externalizado en paquete dedicados y fueron removidos del core desde **Nuxt 2.9**. Aquí están las pautas para migrar su proyecto existente de Nuxt TypeScript a las últimas especificaciones.

La siguiente guía de migración funciona tanto para **nuxt** o **nuxt-edge**.

**1. Migrar dependencias**

```sh
yarn remove @nuxt/typescript
yarn add --dev @nuxt/typescript-build
# o tambien
npm uninstall @nuxt/typescript
npm install --save-dev @nuxt/typescript-build
```

**2. Agrega el módulo `@nuxt/typescript-build` a tu archivo nuxt.config.js**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

**3. Reemplaza `@nuxt/vue-app` y `@nuxt/config` con `@nuxt/types` en tu archivo `tsconfig.json`**

```json{4}
// tsconfig.json
"compilerOptions": {
  "types": [
    "@nuxt/types"
  ]
}
```

::: tip
Si estaba importando tipos desde **@nuxt/config**, debe importarlos desde **@nuxt/types**.

Las importaciones de los tipos pueden haber cambiado un poco, usted puede familiarizarse con ellas activando el intellisense cuando importa o verlo [aquí](https://github.com/nuxt/typescript/tree/master/packages/types) ahora.
:::

**4. Mueva sus opciones customizadas desde `build.typescript` hacia las opciones del módulo**

```js
// nuxt.config.js
export default {
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
```

También puedes hacerlo de esta manera:

```js
// nuxt.config.js
export default {
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ]
}
```

**5. TypeScript Runtime (opcional)**

Si tu proyecto esta usando TypeScript runtime (**nuxt.config.ts**, **modulos** locales o **serverMiddlewares**), por favor consulta directamente la sección [**Runtime**](./guide/runtime).
