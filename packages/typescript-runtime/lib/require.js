const { getNodeArgs } = require('./args')

function applyRequires () {
  const nodeArgs = getNodeArgs()
  const requireOptions = nodeArgs['--require']
  if (requireOptions && requireOptions.length) {
    requireOptions.forEach(arg => require(arg))
    process.argv = process.argv.filter(arg => !['--require', '-r'].includes(arg) && requireOptions && !requireOptions.includes(arg))
  }
}

module.exports = {
  applyRequires
}
