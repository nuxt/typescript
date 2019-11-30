import path from 'path'
import fs from 'fs-extra'
import { compileTypescriptBuildFiles } from '../src/compile'

const FOUR_MINUTES = 240000

describe('config compilation', () => {
  test(
    'compiles nuxt.config',
    async () => {
      const fixture = path.join(__dirname, 'fixture')
      const workPath = path.join(
        __dirname,
        '../../../.tmp',
        path.basename(fixture)
      )
      await fs.remove(workPath)
      await fs.copy(fixture, workPath)
      await compileTypescriptBuildFiles({ rootDir: workPath })

      const builtFiles = [
        '.nuxt.config/nuxt.config.js',
        '.nuxt.config/package.json',
        '.nuxt.config/server-middleware.js',
        '.nuxt.config/local-module.js'
      ]

      builtFiles.forEach((file) => {
        expect(fs.existsSync(path.join(workPath, file)))
      })
    },
    FOUR_MINUTES
  )
  test(
    'fails with wrong tsconfig',
    async () => {
      expect.assertions(1)
      try {
        const fixture = path.join(__dirname, 'fixture')
        const workPath = path.join(
          __dirname,
          '../../../.tmp',
          path.basename(fixture)
        )
        await fs.remove(workPath)
        await fs.copy(fixture, workPath)
        await compileTypescriptBuildFiles({
          rootDir: workPath,
          tsConfigName: 'wrong.json'
        })
      } catch (e) {
        expect(e).toBeDefined()
      }
    },
    FOUR_MINUTES
  )
  test(
    'fails with missing nuxt.config',
    async () => {
      expect.assertions(1)
      try {
        const fixture = path.join(__dirname, 'fixture')
        const workPath = path.join(
          __dirname,
          '../../../.tmp',
          path.basename(fixture)
        )
        await fs.remove(workPath)
        await fs.mkdirp(workPath)
        await compileTypescriptBuildFiles({
          rootDir: workPath
        })
      } catch (e) {
        expect(e).toBeDefined()
      }
    },
    FOUR_MINUTES
  )
})
