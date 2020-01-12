---
prev: false
---

# 從 Nuxt 2.8 遷移

TypeScript 的支援已經在獨立的依賴套件中外部化，並且在 **Nuxt 2.9** 起從核心移除，在這個章節中，我們將引導你怎麼從現有的 Nuxt TypeScript 專案中遷移到最新的規範。

以下的遷移指南將適用於 **nuxt** 或 **nuxt-edge**。


**1. 遷移依賴套件**

```sh
yarn remove @nuxt/typescript
yarn add --dev @nuxt/typescript-build
# 或
npm uninstall @nuxt/typescript
npm install --save-dev @nuxt/typescript-build
```

**2. 新增 `@nuxt/typescript-build` 模組到你的 nuxt.config.js 設定**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

**3. 在 `tsconfig.json` 中，用 `@nuxt/types` 替換 `@nuxt/vue-app` 和 `@nuxt/config`**

```json{4}
// tsconfig.json
"compilerOptions": {
  "types": [
    "@nuxt/types"
  ]
}
```

::: tip
如果之前是透過 **@nuxt/config** 引入，你需要改用 **@nuxt/types**。

型別的引入可能會有點不太習慣，你可以透過 智慧感知提示 來熟悉，或者你要直接查看 [這裡](https://github.com/nuxt/typescript/tree/master/packages/types) 也行。
:::

**4. 移動舊的自定義的選項 `build.typescript` 到模組選項**

```js
// nuxt.config.js
export default {
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
```

你也可以選擇這樣使用:

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

**5. TypeScript Runtime (可選)**

如果你的專案正在使用 TypeScript runtime (**nuxt.config.ts**, 本地 **modules** 和 **serverMiddlewares**)，請直接參考 [**Runtime**](./guide/runtime) 這個章節。
