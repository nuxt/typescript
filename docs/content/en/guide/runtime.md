---
title: Runtime (optional)
position: 12
description: TypeScript Support for Nuxt.js
category: Guide
---

<alert type="warning">

**Nuxt 2.15** and above comes with runtime TypeScript support built-in so usage of this package is no longer needed nor recommended in those versions.

</alert>

TypeScript runtime is needed for files not compiled by Webpack, such as **nuxt.config** file, local **modules** and **serverMiddlewares**.

Nuxt.js has created a TypeScript runtime wrapper under a dedicated package **`@nuxt/typescript-runtime`**. The wrapper is a binary named **nuxt-ts** that registers [**ts-node**](https://github.com/TypeStrong/ts-node) behind the scenes before running.

## Installation

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

Note that this package is installed as `dependency` and not `devDependency` like `@nuxt/typescript-build`, cause `@nuxt/typescript-runtime` is needed for production.

</alert>

## Usage

All you need to do is update your **package.json** file:

```json{2-5}
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "generate": "nuxt generate",
  "start": "nuxt start"
},
"dependencies": {
  "@nuxt/typescript-runtime": "latest",
  "nuxt": "2.x"
},
"devDependencies": {
  "@nuxt/types": "2.x",
  "@nuxt/typescript-build": "latest"
}
```

You can now use TypeScript for **nuxt.config** file, local **modules** and **serverMiddlewares**.

<alert type="warning">


`@nuxt/typescript-runtime` does not support programmatic usage (as it extends `@nuxt/cli`).

Advanced users might try adding the following code to your server entrypoint (see [source](https://github.com/nuxt/typescript/blob/master/packages/typescript-runtime/src/index.ts)):

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

However, this is **not recommended or supported**.

</alert>


