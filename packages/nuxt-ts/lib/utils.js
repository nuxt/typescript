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
  return resolveNuxtFile('bin/nuxt.js', [ 'nuxt', 'nuxt-start' ])
}

function getRootdirFromArgv() {
  const validCommands = ['dev', 'build', 'generate', 'start']

  let rootDir = process.argv[2]
  if (validCommands.includes(rootDir)) {
    rootDir = process.argv[3]
  }
  if (!rootDir) {
    rootDir = '.'
  }

  return path.resolve(process.cwd(), rootDir)
}

module.exports = {
  resolveNuxtFile,
  resolveNuxtBin,
  getRootdirFromArgv
}
