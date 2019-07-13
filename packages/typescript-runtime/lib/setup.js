const { exists, readJSON, writeJSON } = require('fs-extra')
const consola = require('consola')
const defaultTsJsonConfig = require('./tsconfig')

async function setupTSConfig (tsConfigPath) {
  let contents = ''

  if (await exists(tsConfigPath)) {
    contents = await readJSON(tsConfigPath, 'utf-8')
  }

  if (!contents || JSON.stringify(contents) === '{}') {
    consola.info(`Generating ${tsConfigPath.replace(process.cwd(), '')}`)
    await writeJSON(tsConfigPath, defaultTsJsonConfig, { spaces: 2 })
  }
}

module.exports = setupTSConfig
