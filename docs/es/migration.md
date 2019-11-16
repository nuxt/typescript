---
prev: false
---

# Migración desde Nuxt 2.8

El Soporte de TypeScriot ha sido externalidado en paquetes dedicados y han sido removidos del _"core"_ empezando en **Nuxt 2.9**. Aquí están las pautas para migrar de tu proyecto existente con Nuxt TypeScript a la última especificación.

La siguiente guía de migración funciona ya sea para **nuxt** o **nuxt-edge**.

**1. Migrar las dependencias**

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
Si tu estas importando tipos desde **@nuxt/config**, necesitas cambiarlo a que importen desde **@nuxt/types**.

El como importas tipos puede que cambie un poco, puedes familiarizarte con cualquiera ya sea activando el IntelliSense cuando importar o miralos en vivo [aquí](https://github.com/nuxt/typescript/tree/master/packages/types) ahora.
:::

**4. Mueve las opciones personalizadas de `build.typescript` a opciones de módulo**

```js
// nuxt.config.js
export default {
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
```

Puedes tambien hacerlo de esta forma :

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

**5. TypeScript en Tiempo de Ejecución (opcional)**

Si tu proyecto está usando TypeScript en tiempo de ejecución (**nuxt.config.ts**, **modules** locales o **serverMiddlewares**), por favor referirse directamente a la seccion de [**Tiempo de Ejecución**](./guide/runtime).
