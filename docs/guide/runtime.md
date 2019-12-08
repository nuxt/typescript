
# Runtime (optional)

TypeScript runtime is needed for files not compiled by Webpack, such as **nuxt.config** file, local **modules** and **serverMiddlewares**.

Nuxt.js has created a TypeScript runtime wrapper under a dedicated package **`@nuxt/typescript-runtime`**. The wrapper is a binary named **nuxt-ts** that registers [**ts-node**](https://github.com/TypeStrong/ts-node) behind the scenes before running.

## Installation

```sh
yarn add @nuxt/typescript-runtime
# OR
npm install @nuxt/typescript-runtime
```

::: tip
Note that this package is installed as `dependency` and not `devDependency` like `@nuxt/typescript-build`, cause `@nuxt/typescript-runtime` is needed for production.
:::

## Usage

All you need to do is update your **package.json** file:

```json{2-5}
"scripts": {
  "dev": "nuxt-ts",
  "build": "nuxt-ts build",
  "generate": "nuxt-ts generate",
  "start": "nuxt-ts start"
},
"dependencies": {
  "@nuxt/typescript-runtime": "latest",
  "nuxt": "latest"
},
"devDependencies": {
  "@nuxt/typescript-build": "latest"
}
```

::: tip
**nuxt-ts** also works if you're using edge version of Nuxt.js (**nuxt-edge**).
:::

You can now use TypeScript for **nuxt.config** file, local **modules** and **serverMiddlewares**.

::: warning

`@nuxt/typescript-runtime` does not support programmatic usage (as it extends `@nuxt/cli`). 

Advanced users might try adding the following code to your server entrypoint (see [source](https://github.com/nuxt/typescript/blob/master/packages/typescript-runtime/src/index.ts)):

```js
import { register } from 'ts-node'

register({
  project: 'tsconfig.json',
  compilerOptions: {
    module: 'commonjs'
  }
})
```

However, this is **not recommended or supported**.
:::


