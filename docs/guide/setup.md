# Setup

## Build

```
yarn --dev @nuxt/typescript
# OR
npm install --save-dev @nuxt/typescript
```



```js
// nuxt.config.js
export default {
  devModules: [
    '@nuxt/typescript-build'
  ]
}
```

That's it, you're all set to use TypeScript in your **layouts**, **components**, **plugins** and **middlewares**.

You can check the **CookBook** section to get some TypeScript recipes for your Nuxt project.

### Module options

**typeCheck**

> Enables TypeScript type checking on a separate process.

- Type: `Boolean` or `Object`  
- Default: `true`

When enabled, Nuxt.js uses [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) to provide type checking.

You can use an `Object` to override plugin options or set it to `false` to disable it.

**ignoreNotFoundWarnings**

> Enables suppress not found typescript warnings.

- Type: `Boolean`
- Default: `false`
  
When enabled, you can suppress `export ... was not found ...` warnings.

See also about background information [here](https://github.com/TypeStrong/ts-loader/issues/653).

**Warning:** This property might suppress the warnings you want to see. Be careful with how you configure it.

## Runtime (optional)

TypeScript runtime is needed for files not compiled by Webpack, such as **nuxt.config** file, **modules** and **serverMiddlewares**.

Nuxt.js has created a TypeScript runtime wrapper under a dedicated package **`@nuxt/typescript-runtime`**. The wrapper is a binary named **nuxt-ts** that registers **ts-node** behind the scenes before running.

### Installation

```
yarn @nuxt/typescript-runtime
# OR
npm install @nuxt/typescript-runtime
```

::: tip
Note that this package is installed as `dependency` and not `devDependency` like `@nuxt/typescript-build`, cause `@nuxt/typescript-runtime` is needed for production.
:::

### Usage

All you need to do is updating your **package.json** file:

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
`nuxt-ts` also works if you're using edge version of Nuxt.js (`nuxt-edge`).
:::

You can now use TypeScript for **nuxt.config** file, **modules** and **serverMiddlewares**.
