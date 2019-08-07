# Migration from Nuxt 2.8

TypeScript support has been externalized in dedicated packages and have been removed from core starting **Nuxt 2.9**. Here are the guidelines to migrate your existing Nuxt TypeScript project to the last specifications.

The following migration guide works for either **nuxt** or **nuxt-edge**.


**1. Migrate dependencies**

```sh
yarn remove @nuxt/typescript
yarn add --dev @nuxt/typescript-build
# OR
npm uninstall @nuxt/typescript
npm install --save-dev @nuxt/typescript-build
```

**2. Add `@nuxt/typescript-build` module to your nuxt.config.js**

```js
// nuxt.config.js
export default {
  devModules: ['@nuxt/typescript-build']
}
```

**3. Replace `@nuxt/vue-app` and `@nuxt/config` by `@nuxt/types` in your `tsconfig.json`**

```json{4}
// tsconfig.json
"compilerOptions": {
  "types": [
    "@nuxt/types"
  ]
}
```

::: tip
If you were importing types from **@nuxt/config** you need to instead import them from **@nuxt/types**.

Types imports might have changed a little, you can get familiar with them either by triggering intellisense when importing or watch them live [here](https://github.com/nuxt/typescript/tree/master/packages/types) now.
:::

**4. Move the customized options from `build.typescript` to module options**

```js
// nuxt.config.js
export default {
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
```

You can also do it this way :

```js
// nuxt.config.js
export default {
  devModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ]
}
```

**5. TypeScript Runtime (optional)**

If your project is using TypeScript runtime (**nuxt.config.ts**, local **modules** or **serverMiddlewares**), please directly refers to the [**Runtime**](./guide/runtime) section.
