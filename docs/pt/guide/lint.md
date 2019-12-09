# Lint

## Configuração

Se você estiver usando eslint para verificar seu projeto, aqui está como você pode fazer eslint verificar seus arquivos TypeScript.

Tudo o que você precisa é instalar o pacote `@nuxtjs/eslint-config-typescript`:

::: tip
Se você já estiver usando `@nuxtjs/eslint-config`, removê-lo de suas dependências, as configurações do Nuxt TypeScript ESLint já o incluem.
:::

```sh
npm i -D @nuxtjs/eslint-config-typescript
# OU
yarn add -D @nuxtjs/eslint-config-typescript
```

Em seguida, crie ou edite seu arquivo de configuração do ESLint `.eslintrc.js` extendendo `@nuxtjs/eslint-config-typescript` :
```js
module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
```
::: warning 
Como isso fará com que a ESlint use um parser TypeScript ([`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)), por favor, certifique-se de que a opção 'parserOptions.parser' não seja substituta nem por você ou por outra configuração que você esteja extendendo.

Se você estivesse usando 'babel-eslint' como parser, basta removê-lo de seu '.eslintrc.js' assim como suas dependências.
:::

Finalmente, edite o script 'lint' do seu arquivo `package.json`:

```json
"lint": "eslint --ext .ts,.js,.vue ."
```

</div>

Agora você pode verificar seus arquivos TypeScript executando 'npm run lint' (ou 'yarn lint').

::: tip
Se você precisa editar/atualizar as regras do TypeScript ESLint, você pode encontrar [aqui](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules) uma lista com todas as regras suportadas.
:::

## Lint em tempo de execução

Se você quiser ter o lint em tempo de execução (tendo ESLint funcionando depois que um arquivo foi salvo), você pode ativar o recurso 'eslint' de [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) configurando a opção de módulo 'typeCheck'

```ts
// nuxt.config.js
export default {
  typescript: {
    typeCheck: {
      eslint: true
    }
  }
}
```

::: tip
Você também pode oferecer opções específicas de ESLint com `typeCheck.eslintOptions`
:::

Ele vai verificar o tipo e verificar seu código sempre que você estiver salvando arquivos.
