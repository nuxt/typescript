---
title: 安裝設定
position: 11
description: 'Nuxt.js 的 Typescript 支援'
category: 導覽
---

Nuxt 的 TypeScript 支援主要是透過 **@nuxt/typescript-build** 這個 Nuxt 模組提供。

此章節提供了該如何**安裝**以及**設定**的方法。

## 安裝

<code-group>
<code-block label="Yarn" active>

```sh
yarn add --dev @nuxt/typescript-build @nuxt/types
```

</code-block>
<code-block label="NPM">

```sh
npm install --save-dev @nuxt/typescript-build @nuxt/types
```

</code-block>
</code-group>

## 設定

你只需要在 **`nuxt.config.js`** 中的 **`buildModules`** 中加入 **`@nuxt/typescript-build`**

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

然後再建立 **`tsconfig.json`** 檔案 :

<inject-code query="shared/tsconfig.json"></inject-code>

<alert type="info">

請注意，若你要使用 [**Optional Chaining**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) 和 [**Nullish Coalescing**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing) 語法，請將 tsconfig 中的 target 設定成 **ES2018**。如果你設定成 **ESNext** 的話，則不會如期運作，因為目前看起來尚未支援。

</alert>

你也需要加入下方的 型別聲明檔 來為 Vue 提供 型別

```js{}[vue-shim.d.ts]
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

<alert type="info">

查看 [TypeScript 文件](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 來得知 編譯器 的更多選項。

</alert>

<alert type="warning">


如果你是透過程式化的方式來建立一個自定義伺服器框架時，請注意: 你需要確保在 Nuxt 建置 (Building) 之前就已經準備好 (Ready):

```js

// 確保再繼續之前等待 Nuxt 載入 @nuxt/typescript-build
await nuxt.ready()
...
if (config.dev) {
  const builder = new Builder(nuxt)
  await builder.build()
}
```

</alert>

你已經設定好在 **layouts**, **components**, **plugins** 和 **middlewares** 中使用 TypeScript，就這麼簡單 !

你也可以在 [**更多使用方式**](../cookbook/components/) 中幫助你了解 Nuxt 專案使用 TypeScript 的其他方式。

## 選項

### typeCheck

> 在不同的程序中啟用 TypeScript 的型別檢查。

- 型別: `Boolean` or `Object`
- 預設: `true`

當開啟時， Nuxt 會使用 [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) 來啟用型別檢查。

你也可以透過傳入 `Object` 來覆寫選項，或是設定成 `false` 不啟用。

### ignoreNotFoundWarnings

> 隱藏 未找到 TypeScript 警告。

- 型別: `Boolean`
- 預設: `false`

當選項啟用後，可以隱藏 `export ... was not found ...` 的警告。

在這個[連結](https://github.com/TypeStrong/ts-loader/issues/653)中可以了解更多資訊 

**警告:** 這個選項啟用時可能會把你想看到的一些警告一起隱藏了，在開啟之前請三思。

### loaders

> 自定義 [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options) 選項

- 型別: `Object`

如果你需要額外新增自定義的 TypeScript loader 選項，可以在 `loaders.ts` 和 `loaders.tsx` 選項中分別設定 `ts` 及 `tsx` 這兩種不同的檔案類型選項。

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
