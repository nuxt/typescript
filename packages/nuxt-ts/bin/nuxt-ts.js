#!/usr/bin/env node

const path = require('path')
const { getNuxtBin, getRootdirFromArgv, registerTSNode, setupTSConfig } = require('..')

async function main() {
  const rootDir = getRootdirFromArgv()
  const tsConfigPath = path.resolve(rootDir, 'tsconfig.json')

  await setupTSConfig(tsConfigPath)

  registerTSNode(tsConfigPath)

  require(getNuxtBin())
}

main().catch((error) => {
  require('consola').error(error)
  process.exit(1)
})
