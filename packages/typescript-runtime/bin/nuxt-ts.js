#!/usr/bin/env node

const path = require('path')
const { resolveNuxtBin, getRootdirFromArgv, registerTSNode } = require('..')

function main () {
  const rootDir = getRootdirFromArgv()
  const tsConfigPath = path.resolve(rootDir, 'tsconfig.json')

  registerTSNode(tsConfigPath)

  require(resolveNuxtBin())
}

try {
  main()
} catch (error) {
  require('consola').error(error)
  process.exit(1)
}
