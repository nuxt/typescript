import path from 'path'
import { defu } from 'defu'
import type { Module } from '@nuxt/types'
import type { Options as TsLoaderOptions } from 'ts-loader'
import type { ForkTsCheckerWebpackPluginOptions as TsCheckerOptions } from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions'
import type { RuleSetUseItem } from 'webpack'
import { NormalModuleReplacementPlugin } from 'webpack'

export interface Options {
  ignoreNotFoundWarnings?: boolean
  loaders?: {
    ts?: Partial<TsLoaderOptions>
    tsx?: Partial<TsLoaderOptions>
  }
  typeCheck?: TsCheckerOptions | boolean
}

declare module '@nuxt/types' {
  interface NuxtOptions {
    typescript: Options
  }
}

const defaults: Options = {
  ignoreNotFoundWarnings: false,
  typeCheck: true
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tsModule: Module<Options> = function (moduleOptions) {
  // Combine options
  const options = defu(this.options.typescript, moduleOptions, defaults)

  // Change color of CLI banner
  this.options.cli.bannerColor = 'blue'

  if (!this.options.extensions.includes('ts')) {
    this.options.extensions.push('ts')
  }

  // Extend Builder to handle .ts/.tsx files as routes and watch them
  this.options.build.additionalExtensions = ['ts', 'tsx']

  if (options.ignoreNotFoundWarnings) {
    this.options.build.warningIgnoreFilters!.push(warn =>
      warn.name === 'ModuleDependencyWarning' && /export .* was not found in /.test(warn.message)
    )
  }

  this.extendBuild((config, { _isClient, _isModern }) => {
    config.resolve!.extensions!.push('.ts', '.tsx')

    // Add alias for @babel/runtime/helpers
    // https://github.com/nuxt/typescript/issues/645
    try {
      config.resolve!.alias = {
        ...config.resolve!.alias,
        '@babel/runtime/helpers': path.dirname(require.resolve('@babel/runtime/helpers/package.json'))
      }
    } catch (e) {
      // @babel/runtime may not be present
    }

    const jsxRuleLoaders = config.module!.rules.find(r => (r.test as RegExp).test('.jsx'))!.use as RuleSetUseItem[]
    const babelLoader = jsxRuleLoaders[jsxRuleLoaders.length - 1]

    config.module!.rules.push(...(['ts', 'tsx'] as const).map(ext => ({
      test: new RegExp(`\.${ext}$`),
      use: [
        babelLoader,
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsxSuffixTo: ext === 'tsx' ? [/.vue$/] : [],
            ...(options.loaders && options.loaders[ext])
          }
        }
      ]
    })))
    // Fix paths not resolving in async imports
    // https://github.com/nuxt/typescript/issues/520
    if (this.nuxt.options.alias) {
      const aliases = Object.keys(this.nuxt.options.alias)
      config.plugins!.push(new NormalModuleReplacementPlugin(
        new RegExp(`^(${aliases.map(a => `(?:${a})`).join('|')})`),
        (resource: any) => {
          const alias = aliases.find(alias => resource.request.startsWith(alias))
          if (alias) {
            resource.request = resource.request.replace(alias, this.nuxt.options.alias[alias])
          }
        }
      ))
    }
  })
}