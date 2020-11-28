---
title: イントロダクション
position: 10
description: 'Nuxt.js 向け TypeScript サポート'
category: ガイド
fullscreen: true
---

Nuxt の TypeScript サポートは 3 つのパッケージからなっています :

<alert type="info">

**@nuxt/types**
![Version](https://img.shields.io/npm/v/@nuxt/types?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/types?style=flat-square)

Nuxt TypeScript 型定義が含まれています。


それらはNuxtコアコードに沿って維持されます[リポジトリ `nuxt/nuxt.js`](https://github.com/nuxt/nuxt.js/tree/dev/packages/types)。

</alert>

<alert type="info">

**@nuxt/typescript-build**

![Version](https://img.shields.io/npm/v/@nuxt/typescript-build?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/typescript-build?style=flat-square)

**layouts**、**components**、**plugins** および **middlewares** TypeScript を使用する Nuxt モジュール。

</alert>

<alert type="info">

**@nuxt/typescript-runtime**

![Version](https://img.shields.io/npm/v/@nuxt/typescript-runtime?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/typescript-runtime?style=flat-square)

**nuxt.config** ファイル、ローカルの **modules** および **serverMiddlewares** で TypeScript ランタイムサポートを提供する Nuxt ラッパーバイナリ。

</alert>


<alert type="warning">

これらのパッケージは **Nuxt 2.10** または**それ以上**のバージョンで使用されることを想定しています。

</alert>
