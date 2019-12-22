# Lint

## 設定

如果你正在使用 ESLint 來校驗你的專案，這個章節可以幫助你如何使用 ESLint 來校驗你的 TypeScript 檔案。

你只需要安裝 `@nuxtjs/eslint-config-typescript`:

::: tip
Nuxt TypeScript ESLint 的設定檔已經包含 `@nuxtjs/eslint-config`，如果你正在使用，請先移除這個依賴套件。
:::

```sh
yarn add -D @nuxtjs/eslint-config-typescript
# 或
npm i -D @nuxtjs/eslint-config-typescript
```

然後，建立或編輯 `.eslintrc.js` 讓他擴展 (extends) 自 `@nuxtjs/eslint-config-typescript` :
```js
module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
```
::: warning 
因為這樣做會使 ESlint 使用 ([`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)) 當作語法分析器，請確保 `parserOptions.parser` 這個選項並沒有被其他的擴展 (extends) 設定給覆蓋。

如果你正在使用 `babel-eslint` 當作你的語法分析器，請把他從 `.eslintrc.js` 和你的依賴套件中移除。
:::

最後，編輯 `package.json` 中的 `lint` 指令。

```json
"lint": "eslint --ext .ts,.js,.vue ."
```

</div>

現在就可以透過執行 `npm run lint (或 yarn lint)` 來檢驗你的 TypeScript 檔案。

::: tip
如果你需要 編輯/覆蓋 TypeScript ESLint 規則，你可以在 [這裏](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules) 找到所有支援的規則。
:::

## Runtime 校驗

如果你想要在 runtime 時進行校驗 (存檔後立刻執行 ESLint)，你可以在 `typeCheck` 模組選項中設定並啟用 [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)。

```ts
// nuxt.config.js
export default {
  typescript: {
    typeCheck: {
      eslint: true
    }
  }
}
```

::: tip
你也可以透過 `typeCheck.eslintOptions` 來設定自定義的 ESLint 選項。
:::

當你每次存檔時，都會進行 型別檢查 和 校驗你的程式碼。