---
title: Lint
position: 13
description: 'Nuxt.js 向け TypeScript サポート'
category: ガイド
---

## 設定

プロジェクトで lintをするために ESLint を使用しているのであれば、TypeScript ファイルを ESLint で lint する方法は次のとおりです。

必要なことは、`@nuxtjs/eslint-config-typescript` をインストールすることだけです：

<alert type="info">

すでに `@nuxtjs/eslint-config` を使用している場合、Nuxt TypeScript ESLint に含まれているので依存関係から削除してください。

</alert>

<code-group>
<code-block label="Yarn" active>

```sh
yarn add -D @nuxtjs/eslint-config-typescript
```

</code-block>
<code-block label="NPM">

```sh
npm i -D @nuxtjs/eslint-config-typescript
```

</code-block>
</code-group>

そして、 ESLint設定ファイル `.eslintrc.js` を作成または編集して `@nuxtjs/eslint-config-typescript` を extends に入れます :
```js
module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
```
<alert type="warning">
 
ESlint が TypeScript パーサー（[`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)）を使用するようにするために、`parserOptions.parser` オプションが拡張した他の設定等によってオーバーライドされないことを確認してください。

パーサーとして `babel-eslint` を使用していた場合は、`.eslintrc.js` と依存関係から削除してください。

</alert>

最後に、`package.json` の `lint` スクリプトを編集します。

```json
"lint": "eslint --ext .ts,.js,.vue ."
```

</div>

これで `npm run lint`（もしくは `yarn lint`）を実行して TypeScript ファイルを lint できるようになりました。

<alert type="info">

TypeScript ESLint のルールを編集/上書きする必要がある場合は、[こちら](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)でサポートしているルールの一覧をみることができます。

</alert>

## ランタイム lint

ランタイム lint（ファイル保存後に ESLint を実行する）が必要な場合は、`typeCheck` モジュールオプションを設定することで [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) の `eslint` 機能を有効にすることができます。

```ts{}[nuxt.config.js]
export default {
  typescript: {
    typeCheck: {
      eslint: {
        files: './src/**/*.{ts,js,vue}'
      }
    }
  }
}
```

ファイルを保存するたびに、コードの型チェックと lint の両方が行われます。
