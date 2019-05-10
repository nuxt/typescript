module.exports = function () {
  // TODO: Migrate from packages/webpack/src/config/base.js
  // if (_typescript.build && buildOptions.typescript && buildOptions.typescript.ignoreNotFoundWarnings) {
  //   filters.push(
  //     warn => warn.name === 'ModuleDependencyWarning' &&
  //       /export .* was not found in /.test(warn.message)
  //   )
  // }

  // TODO: Migrate from packages/webpack/src/config/client.js
  // TypeScript type checker
  // Only performs once per client compilation and only if `ts-loader` checker is not used (transpileOnly: true)
  // if (_typescript.build && buildOptions.typescript && buildOptions.typescript.typeCheck && !this.isModern && this.loaders.ts.transpileOnly) {
  //   const ForkTsCheckerWebpackPlugin = require(this.buildContext.nuxt.resolver.resolveModule('fork-ts-checker-webpack-plugin'))
  //   plugins.push(new ForkTsCheckerWebpackPlugin(Object.assign({
  //     vue: true,
  //     tsconfig: path.resolve(rootDir, 'tsconfig.json'),
  //     tslint: false, // We recommend using ESLint so we set this option to `false` by default
  //     formatter: 'codeframe',
  //     logger: consola
  //   }, buildOptions.typescript.typeCheck)))
  // }
}
