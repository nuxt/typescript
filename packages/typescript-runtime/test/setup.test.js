import { resolve } from 'path'
import { readJSON, remove, writeJSON } from 'fs-extra'
import setupTSConfig from '../lib/setup'
import defaultTsJsonConfig from '../lib/tsconfig'

describe('setupTSConfig', () => {
  const tsConfigPath = resolve(__dirname, 'tsconfig.json')

  test('generate config file if not existing', async () => {
    await setupTSConfig(tsConfigPath)

    expect(await readJSON(tsConfigPath)).toEqual(defaultTsJsonConfig)

    await remove(tsConfigPath)
  })
  test('override config file if empty', async () => {
    await writeJSON(tsConfigPath, {})
    await setupTSConfig(tsConfigPath)

    expect(await readJSON(tsConfigPath)).toEqual(defaultTsJsonConfig)

    await remove(tsConfigPath)
  })
  test('do not override config file if empty', async () => {
    const content = { property: 'value' }

    await writeJSON(tsConfigPath, content)
    await setupTSConfig(tsConfigPath)

    expect(await readJSON(tsConfigPath)).toEqual(content)

    await remove(tsConfigPath)
  })
})
