---
title: 介绍
position: 10
description: 'Nuxt.js 的 Typescript 支持'
category: 指南
fullscreen: true
---

Nuxt 的 TypeScript 支持有三个依赖套件 :

<alert type="info">

**@nuxt/types**

![Version](https://img.shields.io/npm/v/@nuxt/types?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/types?style=flat-square)

包含 Nuxt 的 TypeScript 类型定义。

它们按照Nuxt内核代码维护[见代码 `nuxt/nuxt.js`](https://github.com/nuxt/nuxt.js/tree/dev/packages/types)。

</alert>

<alert type="info">

**@nuxt/typescript-build**

![Version](https://img.shields.io/npm/v/@nuxt/typescript-build?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/typescript-build?style=flat-square)

能让 Nuxt 在 **layouts**, **components**, **plugins** 和 **middlewares** 中使用 TypeScript。

</alert>

<alert type="info">

**@nuxt/typescript-runtime**

![Version](https://img.shields.io/npm/v/@nuxt/typescript-runtime?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/typescript-runtime?style=flat-square)

Nuxt 封装了二进制文档来为 **nuxt.config** 配置文件, 本地 **modules** 和 **serverMiddlewares** 提供对于 TypeScript runtime 的支持。

</alert>


<alert type="warning">

这些依赖套件只支持 **Nuxt 2.10** or **更高版本**.

</alert>
