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

  this.options.extensions.push('ts')

  /*
    TODO: Extend Builder supportedExtensions to watch .ts/.tsx files | https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js#L47
    HOW: Refactor core so it can be extended by modules
  */

  /*
    TODO: Extend createRoutes supportedExtensions to handle .ts/.tsx files as routes | https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src/route.js#L135
    HOW: Refactor core so it can be extended by modules
  */

  this.extendBuild((config, { isClient, isModern }) => {
    config.resolve.extensions.push('.ts', '.tsx')

    config.module.rules.push(...['ts', 'tsx'].map(ext =>
      ({
        test: new RegExp(`\\.${ext}$`, 'i'),
        use: [
          /*
            TODO: Add babel-loader here | https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L217
            HOW: Find a way get babelLoader object (already filled with correct babel options)
          */
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
        logger: consola
      }, moduleOptions.typeCheck)))
    }

    /*
      TODO: ignoreNotFoundWarnings | https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L432
      HOW: Refactor core so we can extend filters of the WarnFixPlugin
    */
  })
}

module.exports = tsModule
module.exports.meta = require('../package.json')
