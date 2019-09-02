const path = require('path')
const { register } = require('ts-node')

const hooks = {
  setup ({ rootDir }) {
    rootDir = rootDir || path.resolve(process.cwd(), process.argv[2] || '.')

    register({
      project: path.resolve(rootDir, 'tsconfig.json'),
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
