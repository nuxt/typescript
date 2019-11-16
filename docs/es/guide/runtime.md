
# Tiempo de Ejecución (opcional)

TypeScript en tiempo de ejecución es requerido para archivos que no son compilados por Webpack como lo es el archivo **nuxt.config**, **modules** locales y **serverMiddlewares**

Nuxt.js ha creado un envolvente de TypeScript en tiempo de ejecución bajo un paquete dedicado **`@nuxt/typescript-runtime`**. El envolventes es un binario llamado **nuxt-ts** que registra [**ts-node**](https://github.com/TypeStrong/ts-node) detrás de escena antes de correrlo.

## Instalación

```sh
yarn add @nuxt/typescript-runtime
# o tamvbien
npm install @nuxt/typescript-runtime
```

::: tip
Nota que este paquete es instalado como una `dependency` y no una `devDependency` como `@nuxt/typescript-build`, debido a que `@nuxt/typescript-runtime` es requerido para producción.
:::

## Uso

Todo lo que necesitas hacer es actualizar tu archivo **package.json** :

```json{2-5}
"scripts": {
  "dev": "nuxt-ts",
  "build": "nuxt-ts build",
  "generate": "nuxt-ts generate",
  "start": "nuxt-ts start"
},
"dependencies": {
  "@nuxt/typescript-runtime",
  "nuxt"
},
"devDependencies": {
  "@nuxt/typescript-build"
}
```

::: tip
**nuxt-ts** tambien funciona si estás usando la version _"edge"_ de Nuxt.js (**nuxt-edge**).
:::

Ya puedes usar TypeScript para tu archivo **nuxt.config** , **modules** locales y **serverMiddlewares**.
