---
title: 代码检查
position: 13
description: 'Nuxt.js 的 Typescript 支持'
category: 指南
---

## 设置

如果你正在使用 ESLint 来检查你的项目，这个章节可以帮助你使用 ESLint 来检查你的 TypeScript 文件。

你只需要安装 `@nuxtjs/eslint-config-typescript`:

<alert type="info">

若你正在使用 `@nuxtjs/eslint-config` ，请先移除此依赖，因为 Nuxt TypeScript ESLint 的设置文件已经包含相关配置。

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

然后，创建或编辑 `.eslintrc.js` 文件，以扩展（extend） `@nuxtjs/eslint-config-typescript` :
```js
module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
```
<alert type="warning">
 
因为这样做会使 ESlint 用 ([`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)) 作为TypeScript语法分析器，所以请确保 `parserOptions.parser` 这个选项并没有被其他的扩展 (extends) 设置所覆盖。

如果你正在使用 `babel-eslint` 当作你的语法分析器，请将其从 `.eslintrc.js` 和你的依赖文件中移除。

</alert>

最后，编辑 `package.json` 中的 `lint` 指令。

```json
"lint": "eslint --ext .ts,.js,.vue ."
```

</div>

现在就可以通过运行 `npm run lint (或 yarn lint)` 来检查你的 TypeScript 文件。

<alert type="info">

如果你需要 编辑/覆盖 TypeScript ESLint 规则，你可以在 [这里](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules) 找到所有支持的规则。

</alert>

## 运行时检查

如果你想要在运行时进行检查 (文件保存后立刻运行 ESLint)，你可以在 `typeCheck` 模块选项中启用 [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)。

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

当你每次保存时，都会进行类型检查和代码格式检查。
