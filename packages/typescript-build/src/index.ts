import path from 'path'
import consola from 'consola'
import { Module } from '@nuxt/types'
import { Options as TsLoaderOptions } from 'ts-loader'
import { Options as TsCheckerOptions } from 'fork-ts-checker-webpack-plugin'
import { RuleSetUseItem } from 'webpack'

declare module '@nuxt/types' {
  interface Configuration {
    typescript?: Options
  }
}

export interface Options {
  ignoreNotFoundWarnings?: boolean
  loaders?: {
    ts?: TsLoaderOptions
    tsx?: TsLoaderOptions
  }
  typeCheck?: TsCheckerOptions | boolean
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

  // Extend Builder to handle .ts/.tsx files as routes and watch them
  this.options.build!.additionalExtensions = ['ts', 'tsx']

  if (options.ignoreNotFoundWarnings) {
    this.options.build!.warningIgnoreFilters!.push(warn =>
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
              [`append${ext.charAt(0).toUpperCase() + ext.slice(1)}SuffixTo`]: [/\.vue$/],
              ...(options.loaders && options.loaders[ext])
            }
          }
        ]
      })
    ))

    if (options.typeCheck && isClient && !isModern) {
      const ForkTsCheckerWebpackPlugin = require(this.nuxt.resolver.resolveModule('fork-ts-checker-webpack-plugin'))
      config.plugins!.push(new ForkTsCheckerWebpackPlugin(Object.assign({
        vue: true,
        tsconfig: path.resolve(this.options.rootDir!, 'tsconfig.json'),
        tslint: false, // We recommend using ESLint so we set this option to `false` by default
        formatter: 'codeframe',
        logger: consola.withScope('nuxt:typescript')
      }, options.typeCheck)))
    }
  })
}

export default tsModule
