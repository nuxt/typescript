# Introduction

Nuxt TypeScript Support comes with 3 packages :

::: tip @nuxt/types 
![Version](https://img.shields.io/npm/v/@nuxt/types?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/types?style=flat-square)

Contains Nuxt TypeScript type definitions.

It is shipped by both **@nuxt/typescript-build** and **@nuxt/typescript-runtime** packages.
:::

::: tip @nuxt/typescript-build
![Version](https://img.shields.io/npm/v/@nuxt/typescript-build?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/typescript-build?style=flat-square)

Nuxt module to use TypeScript in **layouts**, **components**, **plugins** and **middlewares**.
:::

::: tip @nuxt/typescript-runtime
![Version](https://img.shields.io/npm/v/@nuxt/typescript-runtime?color=%23007ACC&style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@nuxt/typescript-runtime?style=flat-square)

Nuxt wrapper binary to provide TypeScript runtime support for **nuxt.config** file, local **modules** and **serverMiddlewares**.
:::


::: warning 
These packages are intended to only be used with **Nuxt 2.10** or **above**.
:::

::: warning 
If you want to distribute your **Nuxt Typescript** app using **npm** packages, be
aware that **nuxt-ts start** will not work properly, because path to your
appplication with contain **node_modules**. Is is because **nuxt-ts** uses
**ts-node** under the hood.
See [ts-node docs](https://github.com/TypeStrong/ts-node/#how-it-works) for more
details
:::
