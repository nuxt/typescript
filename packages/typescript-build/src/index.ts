import path from 'path'
import consola from 'consola'
import { Module } from '@nuxt/types'
import { Options as TsLoaderOptions } from 'ts-loader'
import { ForkTsCheckerWebpackPluginOptions as TsCheckerOptions } from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions'
import { RuleSetUseItem } from 'webpack'

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

const tsModule: Module<Options> = function (moduleOptions) {
  // Combine options
  const options = Object.assign(
    defaults,
    this.options.typescript,
    moduleOptions
  )

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

  this.extendBuild((config, { isClient, isModern }) => {
    config.resolve!.extensions!.push('.ts', '.tsx')

    const jsxRuleLoaders = config.module!.rules.find(r => (r.test as RegExp).test('.jsx'))!.use as RuleSetUseItem[]
    const babelLoader = jsxRuleLoaders[jsxRuleLoaders.length - 1]

    config.module!.rules.push(...(['ts', 'tsx'] as const).map(ext =>
      ({
        test: new RegExp(`\\.${ext}$`, 'i'),
        use: [
          babelLoader,
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsxSuffixTo: ext === 'tsx' ? [/\.vue$/] : [],
              ...(options.loaders && options.loaders[ext])
            }
          }
        ]
      })
    ))

    if (options.typeCheck && isClient && !isModern) {
      const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
      config.plugins!.push(new ForkTsCheckerWebpackPlugin(Object.assign({
        typescript: {
          configFile: path.resolve(this.options.rootDir!, 'tsconfig.json'),
          extensions: {
            vue: true
          }
        },
        logger: consola.withScope('nuxt:typescript')
      } as TsCheckerOptions, options.typeCheck)))
    }
  })
}

export default tsModule
