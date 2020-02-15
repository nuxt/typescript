# セットアップ

Nuxt TypeScript サポートは主に Nuxt モジュールである **@nuxt/typescript-build** を通して行われます。

ここではインストール方法と設定についてご紹介します。

## インストール

```sh
yarn add --dev @nuxt/typescript-build
# または
npm install --save-dev @nuxt/typescript-build
```

## 設定

必要なことは、**`nuxt.config.js`** 内の **`buildModules`** に **`@nuxt/typescript-build`** を追加することです。

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

そして、**`tsconfig.json`** ファイルを作成します：

<<< @/shared/tsconfig.json

::: tip
現時点では **esnext** が [**Optional Chaining**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) と [**Nullish Coalescing**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing) をサポートしていないようです。これらの機能を使えるようにするためにターゲットに **es2018** を指定する必要があることに注意してください。
:::

また、以下の型宣言を追加し Vue ファイルの型を提供する必要があります：

`vue-shim.d.ts`:
```ts 
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

::: tip
`@nuxt/typescript-build` は `@nuxt/types` を同梱しているため、それぞれをインストールする必要はありません。
:::

::: tip

さまざまなコンパイラオプションについては、公式の [TypeScript ドキュメント](https://www.typescriptlang.org/docs/handbook/compiler-options.html)を確認してください。
:::

::: warning

独自のサーバーフレームワークで Nuxt をプログラムにより使用している場合、ビルドを行う前に Nuxt の準備ができるまで待機する必要があることに注意してください：

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

これで **layouts**、**components**、**plugins** と **middlewares** で TypeScript が使えるように設定できました。

[**CookBook**](../cookbook/components/) セクションで Nuxt プロジェクトの TypeScript レシピをみることができます。

## モジュールのオプション

### typeCheck

> 別プロセスで TypeScript の型チェックを有効にします。

- 型: `Boolean` または `Object`
- デフォルト: `true`

有効にすると、Nuxt.js は型チェックのために [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) を使用します。

`Object` を使用して plugin オプションを上書きするか、`false` を設定して無効にできます。

### ignoreNotFoundWarnings

> not found に関する TypeScript の警告抑制を有効にします。

- 型: `Boolean`
- デフォルト: `false`

有効にすると、`export ... was not found ...` の警告が抑制されます。

背景については[こちら](https://github.com/TypeStrong/ts-loader/issues/653)をご覧ください。

**警告：** このプロパティは必要な警告まで抑制する可能性があります。設定するかどうか、慎重を期してください。

### loaders

> [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options) オプションのカスタマイズ

- 型: `Object`

TypeScript loader をさらにカスタマイズする必要がある場合は、`loaders.ts` および `loaders.tsx` モジュールのオプションを使用して `ts` と `tsx` ファイルの両方をカスタマイズできます：

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
