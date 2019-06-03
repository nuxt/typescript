const path = require('path')
const consola = require('consola')

const defaults = {
  typeCheck: true,
  ignoreNotFoundWarnings: true
}

function tsModule(_moduleOptions) {
  // Combine options
  const moduleOptions = Object.assign(
    defaults,
    this.options.typescript,
    _moduleOptions
  )

  // Allow TypeScript extension for severMiddlewares (`nuxt.resolver.resolvePath` uses `options.extensions`)
  this.options.extensions.push('ts')

  // Extend Builder to handle .ts/.tsx files as routes and watch them
  this.options.build.additionalExtensions = ['ts', 'tsx']

  if (moduleOptions.ignoreNotFoundWarnings) {
    this.options.build.warningIgnoreFilters.push(warn =>
      warn.name === 'ModuleDependencyWarning' && /export .* was not found in /.test(warn.message)
    )
  }

  this.extendBuild((config, { isClient, isModern }) => {
    config.resolve.extensions.push('.ts', '.tsx')

    const jsxRule = config.module.rules.find(r => r.test.test('.jsx'))
    const babelLoader = jsxRule.use[jsxRule.use.length - 1]

    config.module.rules.push(...['ts', 'tsx'].map(ext =>
      ({
        test: new RegExp(`\\.${ext}$`, 'i'),
        use: [
          babelLoader,
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              [`append${ext.charAt(0).toUpperCase() + ext.slice(1)}SuffixTo`]: [/\.vue$/]
            }
          }
        ]
      })
    ))

    if (moduleOptions.typeCheck && isClient && !isModern) {
      const ForkTsCheckerWebpackPlugin = require(this.nuxt.resolver.resolveModule('fork-ts-checker-webpack-plugin'))
      config.plugins.push(new ForkTsCheckerWebpackPlugin(Object.assign({
        vue: true,
        tsconfig: path.resolve(this.options.rootDir, 'tsconfig.json'),
        tslint: false, // We recommend using ESLint so we set this option to `false` by default
        formatter: 'codeframe',
        logger: consola.withScope('nuxt:typescript')
      }, moduleOptions.typeCheck)))
    }
  })
}

module.exports = tsModule
module.exports.meta = require('../package.json')
