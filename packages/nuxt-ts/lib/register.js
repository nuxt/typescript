const { register } = require('ts-node')

function registerTSNode(tsconfigPath) {
  // https://github.com/TypeStrong/ts-node
  register({
    project: tsconfigPath,
    compilerOptions: {
      module: 'commonjs'
    }
  })
}

module.exports = registerTSNode
