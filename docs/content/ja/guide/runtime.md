---
title: Runtime（オプション）
position: 12
description: 'Nuxt.js 向け TypeScript サポート'
category: ガイド
---

TypeScript ランタイムは、**nuxt.config** ファイル、ローカルの **modules** および **serverMiddlewares** といった Webpack でコンパイルされていないファイルのために必要です。

Nuxt.js は **`@nuxt/typescript-runtime`** という専用パッケージの下に TypeScript ランタイムラッパーを作成しました。ラッパーは **nuxt-ts** という名前のバイナリで、実行前に裏側で [**ts-node**](https://github.com/TypeStrong/ts-node) を登録します。

## インストール

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

このパッケージは、`@nuxt/typescript-build` のように `devDependency` ではなく `dependency` でインストールされることに注意してください。本番環境では、`@nuxt/typescript-runtime` が必要になります。

</alert>

## 使用方法

**package.json** ファイルをアップデートします：

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

Nuxt.js の edge バージョン（**nuxt-edge**）を使用しているなら、**nuxt-ts** も動きます。

</alert>

これで、**nuxt.config** ファイル、ローカルの **modules** および **serverMiddlewares** で TypeScript を使用できるようになりました。

<alert type="warning">


`@nuxt/typescript-runtime` はプログラムによる使用をサポートしていません（`@nuxt/cli` を拡張しているため）。 

上級ユーザーは、サーバーエントリーポイントに次のコードを追加することができます（ [source](https://github.com/nuxt/typescript/blob/master/packages/typescript-runtime/src/index.ts) を参照してください）：

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

ただし、この方法は**推奨またはサポートされていません**。

</alert>
