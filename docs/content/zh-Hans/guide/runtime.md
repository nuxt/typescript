---
title: 运行时 (可选)
position: 12
description: 'Nuxt.js 的 Typescript 支持'
category: 指南
---

**nuxt.config** 文件、本地 **modules** 以及 **serverMiddlewares**，这些非 Webpack 编译的文件需要通过 TypeScript 运行时来运行。

Nuxt.js 创建了一个专用的包 **`@nuxt/typescript-runtime`** 以封装 TypeScript 运行时。此包提供一个名为 **nuxt-ts** 的二进制文档，其会在运行之前先注册 [**ts-node**](https://github.com/TypeStrong/ts-node)。

## 安装

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

注意，这个包应该作为 `dependency` 而非 `devDependency` 安装（与 `@nuxt/typescript-build` 不同），原因是 `@nuxt/typescript-runtime` 是正式环境所需要的。

</alert>

## 如何使用

你只需要更改 **package.json** 文件:

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

如果你使用的是 Nuxt.js 的 edge 版本，**nuxt-ts** 也可照常使用。

</alert>

设置完成后，你就可以在 **nuxt.config** 文件， 本地 **modules** 和 **serverMiddlewares** 中使用 TypeScript 了。

<alert type="warning">


`@nuxt/typescript-runtime` 不支持以编程的方式使用 (因为他是扩展自 `@nuxt/cli`)。

但是，进阶用户可以尝试将下方的代码加入服务器入口点文件中 (查看 [来源](https://github.com/nuxt/typescript/blob/master/packages/typescript-runtime/src/index.ts)):

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

然而，我们 **不建议且不支持** 这么做。

</alert>


