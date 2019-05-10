const { exists, readFile, writeJSON } = require('fs-extra')
const consola = require('consola')
const defaultTsJsonConfig = require('./tsconfig')

async function setupTSConfig(tsConfigPath) {
  let contents = ''

  if (await exists(tsConfigPath)) {
    contents = await readFile(tsConfigPath, 'utf-8')
  }

  if (!contents || contents === '{}') {
    consola.info(`Generating ${tsConfigPath.replace(process.cwd(), '')}`)
    await writeJSON(tsConfigPath, defaultTsJsonConfig, { spaces: 2 })
  }
}

module.exports = setupTSConfig
