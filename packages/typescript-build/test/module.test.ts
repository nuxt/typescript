
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { Nuxt } from '@nuxt/core-edge'
import { Builder } from '@nuxt/builder-edge'
import { BundleBuilder } from '@nuxt/webpack-edge'

import tsModule from '../src'

jest.setTimeout(60000)
jest.mock('fork-ts-checker-webpack-plugin')

const buildWithTsModule = async (config = {}) => {
  const nuxt = new Nuxt({
    build: {
      warningIgnoreFilters: []
    },
    ...config
  })

  await nuxt.moduleContainer.addModule(tsModule)
  const builder = new Builder(nuxt, BundleBuilder)
  await builder.build()

  return builder
}

describe('module', () => {
  let builder

  beforeEach(() => {
    // @ts-ignore
    ForkTsCheckerWebpackPlugin.mockClear()
  })

  test('with default options', async () => {
    builder = await buildWithTsModule()

    expect(builder.nuxt.options.build.additionalExtensions).toHaveLength(2)
    expect(builder.nuxt.options.build.additionalExtensions).toEqual(['ts', 'tsx'])

    expect(ForkTsCheckerWebpackPlugin).toHaveBeenCalledTimes(1)
  })

  test('without typeCheck', async () => {
    builder = await buildWithTsModule({
      typescript: {
        typeCheck: false
      }
    })

    expect(ForkTsCheckerWebpackPlugin).not.toHaveBeenCalled()
  })

  test('with ignoreNotFoundWarnings', async () => {
    builder = await buildWithTsModule({
      typescript: {
        ignoreNotFoundWarnings: true
      }
    })

    expect(builder.nuxt.options.build.warningIgnoreFilters).toHaveLength(1)
    expect(builder.nuxt.options.build.warningIgnoreFilters).toEqual([expect.any(Function)])
    expect(builder.nuxt.options.build.warningIgnoreFilters[0]({
      name: 'ModuleDependencyWarning',
      message: 'export x was not found in y'
    })).toEqual(true)
  })

  test('with custom ts-loader options', async () => {
    const loaderOptions = {
      transpileOnly: false
    }

    builder = await buildWithTsModule({
      typescript: {
        loaders: {
          ts: loaderOptions,
          tsx: loaderOptions
        }
      }
    })

    const webpackConfig = builder.bundleBuilder.getWebpackConfig('Client')
    const tsLoader = webpackConfig.module.rules.find(rule => rule.test.test('file.ts')).use.find(u => u.loader === 'ts-loader')
    const tsxLoader = webpackConfig.module.rules.find(rule => rule.test.test('file.tsx')).use.find(u => u.loader === 'ts-loader')

    expect(tsLoader.options.transpileOnly).toBe(false)
    expect(tsxLoader.options.transpileOnly).toBe(false)
  })

  afterEach(async () => {
    await builder.nuxt.close()
  })
})
