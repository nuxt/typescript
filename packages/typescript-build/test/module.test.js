
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { Nuxt } from '../../../../core/packages/core/src/index'
import { Builder } from '../../../../core/packages/builder/src/index'
import { BundleBuilder } from '../../../../core/packages/webpack/src/index'

import tsModule from '..'

jest.setTimeout(60000)
jest.mock('fork-ts-checker-webpack-plugin')

const buildWithTsModule = async (config) => {
  const nuxt = new Nuxt({
    build: {
      warningIgnoreFilters: []
    },
    ...config
  })

  try {
    await nuxt.moduleContainer.addModule(tsModule)
    await new Builder(nuxt, BundleBuilder).build()
  } catch (err) {

  }
  return nuxt
}

describe('module', () => {
  beforeEach(() => {
    ForkTsCheckerWebpackPlugin.mockClear()
  })

  test('with default options', async () => {
    const nuxt = await buildWithTsModule()

    expect(nuxt.options.extensions).toHaveLength(3)
    expect(nuxt.options.extensions).toEqual(['js', 'mjs', 'ts'])

    expect(nuxt.options.build.additionalExtensions).toHaveLength(2)
    expect(nuxt.options.build.additionalExtensions).toEqual(['ts', 'tsx'])

    expect(ForkTsCheckerWebpackPlugin).toHaveBeenCalledTimes(1)

    await nuxt.close()
  })

  test('without typeCheck', async () => {
    const nuxt = await buildWithTsModule({
      typescript: {
        typeCheck: false
      }
    })

    expect(ForkTsCheckerWebpackPlugin).not.toHaveBeenCalled()

    await nuxt.close()
  })

  test('with ignoreNotFoundWarnings', async () => {
    const nuxt = await buildWithTsModule({
      typescript: {
        ignoreNotFoundWarnings: true
      }
    })

    expect(nuxt.options.build.warningIgnoreFilters).toHaveLength(1)
    expect(nuxt.options.build.warningIgnoreFilters).toEqual([expect.any(Function)])
    expect(nuxt.options.build.warningIgnoreFilters[0]({
      name: 'ModuleDependencyWarning',
      message: 'export x was not found in y'
    })).toEqual(true)

    await nuxt.close()
  })
})
