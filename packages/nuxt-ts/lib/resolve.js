const path = require('path')

function resolveNuxtFile(filePath, packages) {
  packages.push(...packages.map(p => p + '-edge'))

  for (const p of packages) {
    try {
      return require.resolve(path.join(p, filePath))
    } catch { }
  }
}

function resolveNuxtBin() {
  return resolveNuxtFile('bin/nuxt.js', ['nuxt', 'nuxt-start'])
}

module.exports = {
  resolveNuxtFile,
  resolveNuxtBin
}
