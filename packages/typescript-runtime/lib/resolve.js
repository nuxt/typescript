const path = require('path')

function tryResolve (path) {
  try {
    return require.resolve(path)
  } catch (err) {
    return null
  }
}

function resolveNuxtFile (filePath, packages = ['nuxt', 'nuxt-start']) {
  packages.push(...packages.map(pkg => pkg + '-edge'))

  for (const pkg of packages) {
    const resolvedFile = tryResolve(path.join(pkg, filePath))

    if (resolvedFile) {
      return resolvedFile
    }
  }
}

function resolveNuxtBin () {
  return resolveNuxtFile('bin/nuxt.js')
}

module.exports = {
  resolveNuxtFile,
  resolveNuxtBin,
  tryResolve
}
