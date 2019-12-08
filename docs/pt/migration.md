---
prev: false
---

# Migração do Nuxt 2.8

O suporte TypeScript foi externalizado em pacotes dedicados e foi removido do núcleo inicial do **Nuxt 2.9**. Aqui estão as diretrizes para migrar seu projeto Nuxt TypeScript existente para as últimas especificações

O seguinte guia de migração funciona para **nuxt** ou **nuxt-edge**.


**1. Migrar dependências**

```sh
yarn remove @nuxt/typescript
yarn add --dev @nuxt/typescript-build
# OU
npm uninstall @nuxt/typescript
npm install --save-dev @nuxt/typescript-build
```

**2. Adicionar o módulo `@nuxt/typescript-build` ao seu arquivo de configuração nuxt.config.js**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

**3. Substituir `@nuxt/vue-app` e `@nuxt/config` por `@nuxt/types` em `tsconfig.json`**

```json{4}
// tsconfig.json
"compilerOptions": {
  "types": [
    "@nuxt/types"
  ]
}
```

::: tip

Se você estava importando tipos de **@nuxt/config** você precisa, em vez importá-los de **@nuxt/types**.

Tipos de importações podem ter mudado um pouco, você pode se familiarizar com eles, seja desencadeando intelecto ao importar ou vizualiza-los [aqui](https://github.com/nuxt/typescript/tree/master/packages/types).
:::

**4. Mova as opções personalizadas de 'build.typescript' para opções de módulo**

```js
// nuxt.config.js
export default {
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
```

Você também pode fazê-lo desta forma:

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

**5. Tempo de execução TypeScript (opcional)**

Se o seu projeto estiver usando o tempo de execução Typescript (**nuxt.config.ts**, **módulos** locai ou **serverMiddlewares**), consulte diretamente a seção [**Tempo de Execução**](./guide/runtime).
