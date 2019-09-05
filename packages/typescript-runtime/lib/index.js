const path = require('path')
const { register } = require('ts-node')

const hooks = {
  'run:before' ({ argv, rootDir }) {
    const customPath = argv.find((_arg, index) => index > 0 && argv[index - 1] === '--tsconfig')
    const tsConfigPath = path.resolve(customPath || rootDir, customPath && customPath.endsWith('.json') ? '' : 'tsconfig.json')

    register({
      project: tsConfigPath,
      compilerOptions: {
        module: 'commonjs'
      }
    })
  },

  config (config) {
    config.extensions = [...(config.extensions || []), 'ts']
  }
}

module.exports = {
  hooks
}
