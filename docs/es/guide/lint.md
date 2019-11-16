# Lint

## Configuración
_
Si ya usas ESLint para _"lintear"_ tu proyecto, aquí tienes como puedes usar ESLint para tus archivos TypeScript.

Todo lo que necesitas es instalar `@nuxtjs/eslint-config-typescript`:

::: tip
Si ya estas usando el paquete `@nuxtjs/eslint-config`, remuevelo de tus dependencias, la configuración de ESLint para Nuxt TypeScript ya la incluye.
:::

```sh
npm i -D @nuxtjs/eslint-config-typescript
# O tambien
yarn add -D @nuxtjs/eslint-config-typescript
```

Entonces, crea o edita tu archivo de configuración de ESLint `.eslintrc.js` extendiendo `@nuxtjs/eslint-config-typescript` :

```js
module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
```

::: warning
Como ESLint va a ser uso del _"parser"_ de TypeScript ([`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)), por favor asegurate que la opción `parserOptions.parser` no es sobreescrito por tí o por otra configuración que está extendiendo.

Si estabas usando `babel-eslint` como _"parser"_, remuevelo de tu archivo  `.eslintrc.js`  y de tus dependencias.
:::

Finalmente, edita el script `lint` de tu `package.json`:

```json
"lint": "eslint --ext .ts,.js,.vue ."
```

Ahora ya puedes _"lintear"_ tus archivos de TypeScript si corres `npm run lint` (o `yarn lint`).
You can now lint your TypeScript files by running `npm run lint` (or `yarn lint`).

::: tip
Si necesitas editar/sobreescribir las reglas de ESLint para TypeScript, puedes encontrar [aquí](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules) la lista de todas las reglas soportadas.
:::

## "Lint" en tiempo de ejecución

Si quieres tener _"lint"_ en tiempo de ejecución (ESLint corriendo después de que un archivo ha sido guardado), puedes habilitar esta caracteristica de `eslint` de [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) configurando la opción de módulo `typeCheck`:

```ts
export default {
  typescript: {
    typeCheck: {
      eslint: true
    }
  }
}
```

::: tip
Puedes también dar opciones de ESLint específicas con `typeCheck.eslintOptions`
:::

Verificará el tipo y _"linteará"_ tu código cada vez que guarde archivos.
