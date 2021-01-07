---
title: Configuração
position: 11
description: 'Suporte de TypeScript para Nuxt.js'
category: Guia
---

O suporte do Nuxt TypeScript vem principalmente através de um módulo Nuxt, **@nuxt/typescript-build**, e seus tipos **@nuxt/types**.

Aqui estão as orientações para instalar e configurá-lo.

## Instalação

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

<alert type="info">

**Versão de tipos**

Você pode querer instalar uma versão específica de tipos que corresponde com sua versão do Nuxt se não for a mais recente:

<code-group>
<code-block label="nuxt" active>

```sh
yarn add --dev @nuxt/types@2.13.2
# OU
npm install --save-dev @nuxt/types@2.13.2
```

</code-block>
<code-block label="nuxt-edge">

```sh
yarn add --dev @nuxt/types@npm:@nuxt/types-edge
# OU
npm install --save-dev @nuxt/types@npm:@nuxt/types-edge
```

</code-block>
</code-group>

O versionamento dos tipos corresponde ao versionamento do Nuxt desde [2.13.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.13.0).

</alert>

## Configuração

Tudo o que você precisa é adicionar **`@nuxt/typescript-build`** ao seu **`buildModules`**  no arquivo **`nuxt.config.js`**

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

e criar um arquivo **`tsconfig.json`** :

<inject-code query="shared/tsconfig.json"></inject-code>

<alert type="info">

Note que o target **ES2018** é necessário para que seja possível o uso de [**Encadeamento Opcional**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) e [**Coalescência Nula**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing), já que o target **ESNext** parece não suportar essas funcionalidades por agora.

</alert>

Você também vai precisar fornecer tipos para arquivos Vue adicionando a seguinte declaração de tipos:

```js{}[vue-shim.d.ts]
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

<alert type="info">

Você pode colocar esse arquivo na pasta raiz do seu projeto ou em uma pasta chamada `types`. Você pode colocá-lo em uma pasta customizada, mas você vai precisar configurar [`typeRoots`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types) no arquivo `tsconfig.json`.

</alert>

<alert type="info">

Verifique a documentação oficial do [TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html) para saber mais sobre as diferentes opções do compilador.

</alert>

<alert type="warning">

Se você está usando o Nuxt programaticamente com um framework de servidor customizado, note que vai precisar ter certeza que você esperou o Nuxt estar pronto antes de começar o build:

```js

// Tenha certeza que esperou o Nuxt carregar o @nuxt/typescript-build antes de continuar
await nuxt.ready()
...
if (config.dev) {
  const builder = new Builder(nuxt)
  await builder.build()
}
```

</alert>

É isso, você está pronto para usar o TypeScript em seus **layouts**, **componentes**, **plugins** e **middlewares**.

Você pode verificar a seção [**CookBook**](../cookbook/components/) para obter dicas de uso do TypeScript em seu projeto Nuxt.

## Opções do módulo

### typeCheck

> Ativa a checagem de tipos do TypeScript em um processo separado.

- Tipo: `Boolean` ou `Object`
- Valor padrão: `true`

Quando ativado, o Nuxt.js usa [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) para fornecer a verificação de tipo.

Você pode usar um `Object` para substituir as opções do plugin ou configurá-lo para `false` para que ele seja desativado.

### ignoreNotFoundWarnings

> Oculta avisos do TypeScript de não encontrado.

- Tipo: `Boolean`
- Valor padrão: `false`

Quando atividado, você pode ocultar avisos como `export ... was not found ...`.

Veja também as informações de fundo [aqui](https://github.com/TypeStrong/ts-loader/issues/653).

**Aviso:** Essa propriedade pode ocultar os avisos que você deseja ver. Tenha cuidado com a forma como você a configura.

### loaders

> Customização das opções do [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options)

- Tipo: `Object`

Se você precisar de personalização extra do TypeScript loader, você pode personalizá-lo para ambos os arquivos `ts` & `tsx` através de opções de módulo `loaders.ts` & `loaders.tsx`:

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
