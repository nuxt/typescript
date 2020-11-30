---
title: 安装设置
position: 11
description: 'Nuxt.js 的 Typescript 支持'
category: 指南
---

Nuxt 的 TypeScript 支持主要是通过 **@nuxt/typescript-build** 这个 Nuxt 模块提供。

此章节提供了此模块**安装**以及**设置**的方法。

## 安装

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

## 设置

你只需在 **`nuxt.config.js`** 中的 **`buildModules`** 中加入 **`@nuxt/typescript-build`**

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

然后再创建 **`tsconfig.json`** 文件 :

<inject-code query="shared/tsconfig.json"></inject-code>

<alert type="info">

请注意，若你要使用 [**Optional Chaining**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) 和 [**Nullish Coalescing**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing) 语法，请将 tsconfig 中的 target 设置成 **ES2018**。如果你设置成 **ESNext** 的话，则不会如期运作，因为目前看起来 **ESNext** 尚未支持这些特性。

</alert>

你也需要加入下方的类型声明文件来为 Vue 提供类型

```js{}[vue-shim.d.ts]
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

<alert type="info">

查看 [TypeScript 文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 来了解编译器的更多选项。

</alert>

<alert type="warning">


如果你是通过编程式的方式来创建一个自定义服务器框架时，请注意: 你需要确保 Nuxt 在构建 (Building) 之前已经准备好 (Ready):

```js

// 确保再继续之前等待 Nuxt 加载 @nuxt/typescript-build
await nuxt.ready()
...
if (config.dev) {
  const builder = new Builder(nuxt)
  await builder.build()
}
```

</alert>

至此，你已经可以在 **layouts**, **components**, **plugins** 和 **middlewares** 中使用 TypeScript 了!

你也可以在 [**更多使用方式**](../cookbook/components/) 中了解 Nuxt 项目使用 TypeScript 的其他方式。

## 选项

### typeCheck

> 在单独的进程中启用 TypeScript 的类型检查。

- 类型: `Boolean` or `Object`
- 缺省: `true`

当打开时， Nuxt 会使用 [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) 来启用类型检查。

你也可以通过传入 `Object` 来覆盖选项，或是设置成 `false` 以禁用。

### ignoreNotFoundWarnings

> 隐藏 “未找到 TypeScript” 警告。

- 类型: `Boolean`
- 缺省: `false`

当选项启用后，可以隐藏 `export ... was not found ...` 的警告。

在这个[链接](https://github.com/TypeStrong/ts-loader/issues/653)中可以了解更多信息

**警告:** 这个选项启用时，可能会把你想看到的一些警告一并隐藏，在打开之前请三思。

### loaders

> 自定义 [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options) 选项

- 类型: `Object`

如果你需要额外添加 TypeScript 加载器选项，可以通过 `loaders.ts` 和 `loaders.tsx` 分别对 `ts` 及 `tsx` 这两种不同的文件类型进行自定义。

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
