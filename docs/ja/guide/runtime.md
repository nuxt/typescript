
# Runtime（オプション）

TypeScript ランタイムは、**nuxt.config** ファイル、ローカルの **modules** および **serverMiddlewares** といった Webpack でコンパイルされていないファイルが必要です。

Nuxt.js は **`@nuxt/typescript-runtime`** という専用パッケージの下に TypeScript ランタイムラッパーを作成しました。ラッパーは **nuxt-ts** という名前のバイナリで、実行前に裏側で **ts-node**](https://github.com/TypeStrong/ts-node) を登録します。

## インストール

```sh
yarn add @nuxt/typescript-runtime
# または
npm install @nuxt/typescript-runtime
```

::: tip
このパッケージは、`@nuxt/typescript-build` のように `devDependency` ではなく `dependency` でインストールされることに注意してください。本番環境では、`@nuxt/typescript-runtime` が必要になります。
:::

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
  "@nuxt/typescript-runtime",
  "nuxt"
},
"devDependencies": {
  "@nuxt/typescript-build"
}
```

::: tip
Nuxt.js の edge バージョン（**nuxt-edge**）を使用しているなら、**nuxt-ts** も動きます。
:::

これで、**nuxt.config** ファイル、ローカルの **modules** および **serverMiddlewares** で TypeScript を使用できるようになりました。
