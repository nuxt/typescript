---
title: Lint
position: 13
description: TypeScript Support for Nuxt.js
category: Guide
---

## Configuration

If you're using ESLint to lint your project, here is how you can make ESLint lint your TypeScript files.

All you need is to install `@nuxtjs/eslint-config-typescript`:

<alert type="info">

If you're already using `@nuxtjs/eslint-config`, remove it from your dependencies, the Nuxt TypeScript ESLint config includes it.

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

Then, create or edit your ESLint configuration `.eslintrc.js` by extending `@nuxtjs/eslint-config-typescript` :
```js
module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
```
<alert type="warning">
 
As it will make ESlint use a TypeScript parser ([`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)), please ensure `parserOptions.parser` option is not overriden either by you or by another configuration you're extending.

If you were using `babel-eslint` as parser, just remove it from your `.eslintrc.js` and your dependencies.

</alert>

Finally, edit the `lint` script of your `package.json`:

```json
"lint": "eslint --ext .ts,.js,.vue ."
```

</div>

You can now lint your TypeScript files by running `npm run lint` (or `yarn lint`).

<alert type="info">

If you need to edit/override TypeScript ESLint rules, You can find [here](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules) the list of all supported rules.

</alert>

## Runtime lint

If you want to have runtime lint (having ESLint running after a file has been saved), you can enable the `eslint` feature of [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) by configuring the `typeCheck` module option

```ts{}[nuxt.config.js]
export default {
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}
```

It will both type-check and lint your code whenever you're saving files.
