# Configuração

O suporte do Nuxt TypeScript vem principalmente através de um módulo Nuxt, **@nuxt/typescript-build**.

Aqui estão as orientações para sua instalar e configurá-lo.

## Instalação

```sh
yarn add --dev @nuxt/typescript-build
# OU
npm install --save-dev @nuxt/typescript-build
```

## Configuração

Tudo o que você precisa é adicionar **`@nuxt/typescript-build`** ao seu **`buildModules`**  no arquivo **`nuxt.config.js`**

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

e criar um arquivo **`tsconfig.json`** :

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "esnext",
      "esnext.asynciterable",
      "dom"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

::: tip
`@nuxt/typescript-build` entrega `@nuxt/types`, então não há necessidade de instalá-lo de forma independente.
:::

::: tip

Verifique a documentação oficial do [TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html) para saber mais sobre as diferentes opções do compilador.
:::

É isso, você está pronto para usar o TypeScrip em seus **layouts**, **componentes**, **plugins** e **middlewares**.

Você pode verificar a seção [**CookBook**](../cookbook/components/) para obter dicas de uso do TypeScript em seu projeto Nuxt.

## Opções de Módulo

### typeCheck

> Permite que o TypeScript verifique o tipo em processos separados.

- Tipo: `Boolean` or `Object`
- Valor padrão: `true`

Quando ativado, o Nuxt.js usa [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) para fornecer a verificação de tipo.

Você pode usar um "Object" para substituir as opções de plugin ou configurá-lo para "false" para que ele seja desativado.

### ignoreNotFoundWarnings

> Permite ocultar avisos não encontrados ddo typescript.

- Tipo: `Boolean`
- Valor padrao: `false`

Quando atividado, você pode ocultar avisos como `export ... was not found ...`.

Veja também as informações básicas [aqui](https://github.com/TypeStrong/ts-loader/issues/653).

**Aviso:** Esta propriedade pode ocultar os avisos que você deseja ver. Tenha cuidado com a forma como você a configura.

### loaders

> Customização das opções do [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options)

- Tipo: `Object`

Se você precisar de personalização extra do TypeScript loader, você pode personalizá-lo para ambos os arquivos 'ts' & 'tsx' através de opções de módulo 'loaders.ts' & 'loaders.tsx' :

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
