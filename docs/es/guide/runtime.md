
# Runtime (opcional)

TypeScript runtime es necesario para archivos que no son compilados por Webpack, asi como el archivo **nuxt.config** , local **modules** y **serverMiddlewares**.

Nuxt.js creo un wrapper para TypeScript runtime en un paquete dedicado **`@nuxt/typescript-runtime`**. El wrapper es un binario llamado **nuxt-ts** que registra [**ts-node**](https://github.com/TypeStrong/ts-node) detras del proceso antes de ejecutarse.

## Instalación

```sh
yarn add @nuxt/typescript-runtime
# OR
npm install @nuxt/typescript-runtime
```

::: tip
Nota este paquete es instalado como `dependency` y no como `devDependency` igual a `@nuxt/typescript-build`, porque `@nuxt/typescript-runtime` es necesario en produccion.
:::

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
  "@nuxt/typescript-runtime",
  "nuxt"
},
"devDependencies": {
  "@nuxt/typescript-build"
}
```

::: tip
**nuxt-ts** tambien funciona si usted esta usando la version edge de Nuxt.js (**nuxt-edge**).
:::

Usted puede ahora usar TypeScript para el archivo **nuxt.config**, **modulos** locales y **serverMiddlewares**.
