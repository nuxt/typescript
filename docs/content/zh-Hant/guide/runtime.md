---
title: Runtime (可選)
position: 12
description: 'Nuxt.js 的 Typescript 支援'
category: 導覽
---

**nuxt.config** 設定檔 和 本地 **modules** 以及 **serverMiddlewares**，這些非 Webpack 編譯的檔案需要透過 TypeScript runtime 來執行。

Nuxt.js 建立了一個專用的依賴套件 **`@nuxt/typescript-runtime`** 去封裝了 TypeScript runtime。這個封裝是一個名為 **nuxt-ts** 的二進制文件，他會在執行之前先在背景註冊。

## 安裝

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

注意，這個依賴套件是安裝為 `dependency` 而非 `devDependency` 像是 `@nuxt/typescript-build` 一樣，原因是 `@nuxt/typescript-runtime` 是正式環境所需要的。

</alert>

## 如何使用

你只需要更改 **package.json** 檔案:

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
  "@nuxt/types": "latest",
  "@nuxt/typescript-build": "latest"
}
```

<alert type="info">

如果你使用的是 Nuxt.js 的 edge 版本，**nuxt-ts** 也是可以照常使用的。

</alert>

設定完成後，你可以在 **nuxt.config** 設定檔， 本地 **modules** 和 **serverMiddlewares** 中使用 TypeScript 了。

<alert type="warning">


`@nuxt/typescript-runtime` 不支援在可程式化的方式下使用 (因為他是擴展自 `@nuxt/cli`)。

在這種情況下，進階使用者可以試著將下方的程式碼加到你的伺服器端點中 (查看 [來源](https://github.com/nuxt/typescript/blob/master/packages/typescript-runtime/src/index.ts)):

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

然而，我們 **不建議 且 不支持** 這麼做。

</alert>


