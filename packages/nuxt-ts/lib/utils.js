const path = require('path')

function getNuxtBin() {
  const binPath = [
    'nuxt-edge/bin/nuxt.js',
    'nuxt/bin/nuxt.js',
    'nuxt-start-edge/bin/nuxt.js',
    'nuxt-start/bin/nuxt.js'
  ]

  for (const bin of binPath) {
    try {
      return require.resolve(bin)
    } catch {}
  }
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
  getNuxtBin,
  getRootdirFromArgv
}
