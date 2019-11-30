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

## Build (alpha)

::: warning
This feature is in an alpha state. Bug reports are appreciated.
:::

We now support compiling local modules, serverMiddleware and `nuxt.config.ts` using TypeScript. If you would like to test, follow these steps:

1. **Move `@nuxt/typescript-runtime` to your `devDependencies`**

   ```json{2-5}
   ...
   "dependencies": {
     "nuxt": "latest"
   },
   "devDependencies": {
     "@nuxt/typescript-runtime": "latest",
     "@nuxt/typescript-build": "latest"
   }
   ```

2. **Update your build and start scripts**

   ```json{2-5}
   "scripts": {
     ...
     "build": "nuxt-ts build --compile",
     "start": "nuxt start -c .nuxt.config/nuxt.config.js"
   },
   ```

3. **Add `.nuxt.config` to your `.gitignore`**

4. **Use!**

   ```bash
   yarn build && yarn start
   ```

The build process will generate a directory (`.nuxt.config`) in which will be placed your compiled file and any dependencies, including serverMiddleware and local modules.
