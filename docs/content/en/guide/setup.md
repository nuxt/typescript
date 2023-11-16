---
title: Setup
position: 11
description: TypeScript Support for Nuxt.js
category: Guide
---

Nuxt TypeScript Support mainly comes through a Nuxt module, **@nuxt/typescript-build**, and its types **@nuxt/types**.

Here are the guidelines to install & configure them.

## Installation

<code-group>
<code-block label="Yarn" active>

```sh
yarn add --dev @nuxt/typescript-build @nuxt/types typescript
```

</code-block>
<code-block label="NPM">

```sh
npm install --save-dev @nuxt/typescript-build @nuxt/types typescript
```

</code-block>
</code-group>

<alert type="info">

**Types version**

You may want to install specific types version to match your Nuxt version if its not latest :

<code-group>
<code-block label="nuxt" active>

```sh
yarn add --dev @nuxt/types@2.13.2
# OR
npm install --save-dev @nuxt/types@2.13.2
```

</code-block>
<code-block label="nuxt-edge">

```sh
yarn add --dev @nuxt/types@npm:@nuxt/types-edge
# OR
npm install --save-dev @nuxt/types@npm:@nuxt/types-edge
```

</code-block>
</code-group>

Types versioning match Nuxt versioning since [2.13.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.13.0).

</alert>

## Configuration

All you need to do is add **`@nuxt/typescript-build`** to your **`buildModules`** in **`nuxt.config.ts`**

```ts {}[nuxt.config.ts]
import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  buildModules: ['@nuxt/typescript-build']
}

export default config
```

and create a **`tsconfig.json`** file :

<inject-code query="shared/tsconfig.json"></inject-code>

<alert type="info">

Notice that **ES2018** or later `target` is needed to be able to use [**Optional Chaining**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) and [**Nullish Coalescing**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing).

</alert>

You will also need to provide types for Vue files by adding the following type declaration:

```js {}[vue-shim.d.ts]
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

<alert type="info">

You can place this file in the root directory of your project or a directory named `types`. You can place it in a custom directory, but you'll need to configure [`typeRoots`](https://www.typescriptlang.org/tsconfig#typeRoots) in the `tsconfig.json` file.

</alert>

<alert type="info">

Check official [TypeScript documentation](https://www.typescriptlang.org/tsconfig) to learn about the different compiler options.

</alert>

<alert type="warning">

If you are using Nuxt programmatically with a custom server framework, note that you will need to ensure that you wait for Nuxt to be ready before building:

```js

// Make sure to wait for Nuxt to load @nuxt/typescript-build before proceeding
await nuxt.ready()
...
if (config.dev) {
  const builder = new Builder(nuxt)
  await builder.build()
}
```

</alert>

That's it, you're all set to use TypeScript in your **pages**, **layouts**, **components**, **plugins** and **middlewares**.

You can check the [**CookBook**](/cookbook/components) section to get some TypeScript recipes for your Nuxt project.

## Module options

### typeCheck

> Enables TypeScript type checking on a separate process.

- Type: `Boolean` or `Object`
- Default:
  ```ts
  {
    typescript: {
      configFile: '~~/tsconfig.json',
      extensions: {
        vue: true
      }
    },
    logger: {
      issues: loggerInterface
    }
  }
  ```

When enabled, Nuxt.js uses [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) to provide type checking.

<alert type="warning">

Note that `script setup` is not supported by this webpack plugin so you won't get any type errors when using it. In that case it might be better to disable the `typeCheck` option and rely on external type checking through [`vue-tsc`](https://www.npmjs.com/package/vue-tsc), for example.

</alert>

You can use an `Object` to override plugin options or set it to `false` to disable it.

When passing a custom object, the passed values are merged with default values.

These are all the options supported by `fork-ts-checker-webpack-plugin`:

```ts
interface ForkTsCheckerWebpackPluginOptions {
  async: boolean
  typescript: TypeScriptReporterOptions
  eslint: EsLintReporterOptions
  formatter: FormatterOptions
  issue: IssueOptions,
  logger: LoggerOptions
}

type TypeScriptReporterOptions =
  | boolean
  | {
      // Enable TypeScript reporter.
      enabled?: boolean;
      // Memory limit for TypeScript reporter process.
      memoryLimit?: number;
      // Path to tsconfig.json.
      configFile?: string;
      configOverwrite?: TypeScriptConfigurationOverwrite;
      // The base path for finding files specified in the tsconfig.json. Same as context option from the ts-loader.
      context?: string;
      // The equivalent of the `--build` flag from the `tsc`.
      build?: boolean;
      // `readonly` keeps all emitted files in memory,
      // `write-tsbuildinfo` which writes only .tsbuildinfo files,
      // `write-dts` writes .tsbuildinfo and type definition files,
      // and `write-references` which writes both .tsbuildinfo and referenced projects output
      mode?: 'readonly' | 'write-tsbuildinfo' | 'write-dts' | 'write-references';
      // Types of diagnostics to be reported.
      diagnosticOptions?: Partial<TypeScriptDiagnosticsOptions>;
      extensions?: {
        vue?: TypeScriptVueExtensionOptions;
      };
      profile?: boolean;
      typescriptPath?: string;
    };
interface TypeScriptDiagnosticsOptions {
  syntactic: boolean;
  semantic: boolean;
  declaration: boolean;
  global: boolean;
}
type TypeScriptVueExtensionOptions =
  | boolean
  | {
      // Enable TypeScript Vue extension.
      enabled?: boolean;
      // Custom vue-template-compiler package.
      compiler?: string;
    };

type EsLintReporterOptions = {
  files: string | string[];
  enabled?: boolean;
  memoryLimit?: number;
  options?: CLIEngineOptions;
};

type FormatterOptions = FormatterType | ComplexFormatterPreferences;
type FormatterType = NotConfigurableFormatterType | ConfigurableFormatterType;
type NotConfigurableFormatterType = undefined | 'basic' | Formatter;
type ConfigurableFormatterType = 'codeframe';
type Formatter = (issue: Issue) => string;
type ComplexFormatterPreferences<T extends FormatterType = FormatterType> = {
  type: T;
  options?: ConfigurableFormatterType<T>;
};

interface IssueOptions {
  include?: IssuePredicateOption;
  exclude?: IssuePredicateOption;
}
type IssuePredicateOption = IssuePredicate | IssueMatch | (IssuePredicate | IssueMatch)[];
type IssuePredicate = (issue: Issue) => boolean;
type IssueMatch = Partial<Pick<Issue, 'origin' | 'severity' | 'code' | 'file'>>;
interface Issue {
  origin: string;
  severity: IssueSeverity;
  code: string;
  message: string;
  file?: string;
  location?: IssueLocation;
}

type LoggerOptions = {
  infrastructure?: LoggerType | Logger;
  issues?: LoggerType | Logger;
  devServer?: boolean;
};
```

### ignoreNotFoundWarnings

> Enables suppress not found typescript warnings.

- Type: `Boolean`
- Default: `false`

When enabled, you can suppress `export ... was not found ...` warnings.

See also about background information [here](https://github.com/TypeStrong/ts-loader/issues/653).

**Warning:** This property might suppress the warnings you want to see. Be careful with how you configure it.

### loaders

> Customization of [`ts-loader`](https://github.com/TypeStrong/ts-loader#loader-options) options

- Type: `Object`

If you need extra customization of the TypeScript loader, you can customize it for both `ts` & `tsx` files through `loaders.ts` & `loaders.tsx` module options :

```ts {}[nuxt.config.ts]
import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  typescript: {
    loaders: {
      ts: {
        silent: true
      },
      tsx: {
        silent: true
      }
    }
  }
}

export default config
```
