---
prev: false
---

# Nuxt 2.8 からの移行

TypeScript サポートは、専用パッケージで外部化され、**Nuxt 2.9** 以降はコア機能から削除されました。ここでは、既存の Nuxt TypeScript プロジェクトを最後の仕様に移行するためのガイドラインを示します。

次の移行ガイドは、**nuxt** および **nuxt-edge** のいずれかで動作します。


**1. 依存関係の移行**

```sh
yarn remove @nuxt/typescript
yarn add --dev @nuxt/typescript-build
# または
npm uninstall @nuxt/typescript
npm install --save-dev @nuxt/typescript-build
```

**2. `@nuxt/typescript-build` モジュールを nuxt.config.js に追加する**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

**3.`tsconfig.json` 内の `@nuxt/vue-app` と `@nuxt/config` を `@nuxt/types` に置き換えます。

```json{4}
// tsconfig.json
"compilerOptions": {
  "types": [
    "@nuxt/types"
  ]
}
```

::: tip
もし、**@nuxt/config** から型をインポートしているのであれば、代わりに **@nuxt/types** から型をインポートする必要があります。

型のインポートは少し変更されている可能性があります。インポート時にインテリセンスをトリガーにして確認するか、[こちら](https://github.com/nuxt/typescript/tree/master/packages/types)の今の状態を確認してください。
:::

**4. カスタマイズしたオプションを `build.typescript` からモジュールのオプションに移動する**

```js
// nuxt.config.js
export default {
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
```

このようにも書けます：

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

**5. TypeScript ランタイム（オプション）**

プロジェクトで TypeScript ランタイム (**nuxt.config.ts**, ローカルの **modules** または **serverMiddlewares**) を使用している場合は、[**Runtime**](./guide/runtime) セクションを直接参照してください。.
