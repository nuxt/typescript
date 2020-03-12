# Setup

Nuxt TypeScript Support mainly comes through a Nuxt module, **@nuxt/typescript-build**.

Here are the guidelines to install & configure it.

## Installation

```sh
yarn add --dev @nuxt/typescript-build
# OR
npm install --save-dev @nuxt/typescript-build
```

## Configuration

All you need to do is add **`@nuxt/typescript-build`** to your **`buildModules`** in **`nuxt.config.js`**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

and create a **`tsconfig.json`** file :

<<< @/shared/tsconfig.json

::: tip
Notice that **es2018** target is needed to be able to use [**Optional Chaining**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) and [**Nullish Coalescing**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing), as **esnext** target doesn't seem to support these features for now.
:::

You will also need to provide types for Vue files by adding the following type declaration:

`vue-shim.d.ts`:
```ts 
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

::: tip
You can place this file in the root directory of your project or a directory named `types`. You can place it in a custom directory, but you'll need to configure [`typeRoots`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types) in the `tsconfig.json` file.
:::

::: tip
`@nuxt/typescript-build` ships `@nuxt/types`, so there's no need to install it independently.
:::

::: tip

Check official [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to learn about the different compiler options.
:::

::: warning

If you are using Nuxt programmatically with a custom server framework, note that you will need to ensure that you wait for Nuxt to be ready before building:

```js

// Make sure to wait for Nuxt to load @nuxt/typescript-build before proceeding
await nuxt.ready()
...
if (config.dev) {
  const builder = new Builder(nuxt)
  await builder.build()
}
```
:::

That's it, you're all set to use TypeScript in your **layouts**, **components**, **plugins** and **middlewares**.

You can check the [**CookBook**](../cookbook/components/) section to get some TypeScript recipes for your Nuxt project.

## Module options

### typeCheck

> Enables TypeScript type checking on a separate process.

- Type: `Boolean` or `Object`
- Default: `true`

When enabled, Nuxt.js uses [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) to provide type checking.

You can use an `Object` to override plugin options or set it to `false` to disable it.

### ignoreNotFoundWarnings

> Enables suppress not found typescript warnings.

- Type: `Boolean`
- Default: `false`

When enabled, you can suppress `export ... was not found ...` warnings.

See also about background information [here](https://github.com/TypeStrong/ts-loader/issues/653).

**Warning:** This property might suppress the warnings you want to see. Be careful with how you configure it.

### loaders

> Customization of [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options) options

- Type: `Object`

If you need extra customization of the TypeScript loader, you can customize it for both `ts` & `tsx` files through `loaders.ts` & `loaders.tsx` module options :

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
