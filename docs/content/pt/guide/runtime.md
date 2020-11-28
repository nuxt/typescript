
# Tempo de execução (opcional)

O tempo de execução typeScript é necessário para arquivos não compilados pelo Webpack, como o arquivo **nuxt.config**, **módulos** locais e **serverMiddlewares**.

Nuxt.js criou um wrapper para o tempo de execução TypeScript em um pacote dedicado **`@nuxt/typescript-runtime`**. O wrapper é um binário chamado **nuxt-ts** que registra [**ts-node**](https://github.com/TypeStrong/ts-node) nos bastidores antes de ser executado..

## Instalação

```sh
yarn add @nuxt/typescript-runtime
# OU
npm install @nuxt/typescript-runtime
```

::: tip
Note-se que este pacote é instalado como "dependência" e não "devDependência", como `@nuxt/typescript-build`, por causa que o `@nuxt/typescript-runtime` é necessário em produção.
:::

## Uso

Tudo que voê precisa é atualiza o seu arquivo **package.json**:

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

::: tip
**nuxt-ts** também funciona se você estiver utilizando a versão edge do Nuxt.js (**nuxt-edge**).
:::

Agora você pode usar TypeScript para o arquivo **nuxt.config**, **módulos** locais e **serverMiddlewares**.
