---
title: Lint
position: 13
description: 'Soporte de Typescript para Nuxt.js'
category: Guía
---

## Configuración

Si usted esta usando ESLint para lintear tu proyecto, asi es como usted puede hacer que ESLint lintee sus archivos TypeScript.

Todo lo que usted necesita es instalar `@nuxtjs/eslint-config-typescript`:

<alert type="info">

Si usted esta usando `@nuxtjs/eslint-config`, eliminelo de sus dependencias, la configuración de ESLint para Nuxt TypeScript ESLint ya lo incluye.

</alert>

```sh
npm i -D @nuxtjs/eslint-config-typescript
# OR
yarn add -D @nuxtjs/eslint-config-typescript
```

Luego, cree o edite su configuración de ESLint `.eslintrc.js` para que extienda de `@nuxtjs/eslint-config-typescript` :
```js
module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
```
<alert type="warning">
 
Para hacer que ESlint use el TypeScript parser ([`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)), por favor, asegurese que la opción `parserOptions.parser` no esta siendo sobreescrita por usted o por alguna otra configuración que esta extendiendo.

Si usted usa `babel-eslint` como parser, solo remuevalo de su configuración `.eslintrc.js` y sus dependencias.

</alert>

Finalmente, edite el script `lint` de su `package.json`:

```json
"lint": "eslint --ext .ts,.js,.vue ."
```

</div>

Ahora, usted puede lintear sus archivos TypeScript corriendo el comando `npm run lint` (o `yarn lint`).

<alert type="info">

Si usted necesita editar/sobreescribir las reglas de TypeScript ESLint, Usted puede encontrar [aqui](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules) una lista de todas las reglas soportadas.

</alert>

## Runtime lint

Si usted desea tener una runtime lint (teniendo ESLint corriendo despues de que una archivo es guardado), usted debe activar la opción `eslint` del [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) configurando la opción `typeCheck` del módulo

```ts{}[nuxt.config.js]
export default {
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}
```

Esto va a verificar los tipos y va a lintear su código cada vez que guarde archivos.
