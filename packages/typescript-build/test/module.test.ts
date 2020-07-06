
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { Nuxt } from '@nuxt/core-edge'
import { Builder } from '@nuxt/builder-edge'
import { BundleBuilder } from '@nuxt/webpack-edge'
import { Configuration as WebpackConfiguration, RuleSetLoader } from 'webpack'
import { NuxtConfig, NuxtOptions } from '@nuxt/types'
import { Options as TsLoaderOptions } from 'ts-loader'

import tsModule from '../src'

jest.setTimeout(60000)
jest.mock('fork-ts-checker-webpack-plugin', () => {
  return jest.fn().mockImplementation(() => ({
    apply () {}
  }))
})

interface BuilderInstance {
  nuxt: {
    options: NuxtOptions,
    close(): void
  }

  bundleBuilder: {
    getWebpackConfig(name: string): WebpackConfiguration
  }

  build(): void
}

const buildWithTsModule = async (config: NuxtConfig = {}): Promise<BuilderInstance> => {
  const nuxt = new Nuxt({
    build: {
      warningIgnoreFilters: []
    },
    ...config
  })

  await nuxt.moduleContainer.addModule(tsModule)
  const builder: BuilderInstance = new Builder(nuxt, BundleBuilder)
  await builder.build()

  return builder
}

describe('module', () => {
  let builder: BuilderInstance

  beforeEach(() => {
    // @ts-ignore
    ForkTsCheckerWebpackPlugin.mockClear()
  })

  test('with default options', async () => {
    builder = await buildWithTsModule()

    expect(builder.nuxt.options.extensions).toContain('ts')

    expect(builder.nuxt.options.build.additionalExtensions).toHaveLength(2)
    expect(builder.nuxt.options.build.additionalExtensions).toEqual(['ts', 'tsx'])

    expect(ForkTsCheckerWebpackPlugin).toHaveBeenCalledTimes(1)
  })

  test('register ts extension once', async () => {
    builder = await buildWithTsModule({
      extensions: ['ts']
    })

    expect(builder.nuxt.options.extensions.filter(ext => ext === 'ts')).toHaveLength(1)
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
    expect(builder.nuxt.options.build.warningIgnoreFilters![0]({
      name: 'ModuleDependencyWarning',
      message: 'export x was not found in y'
    })).toEqual(true)
  })

  test('with custom ts-loader options', async () => {
    const loaderOptions = {
      transpileOnly: false
    } as TsLoaderOptions

    builder = await buildWithTsModule({
      typescript: {
        loaders: {
          ts: loaderOptions,
          tsx: loaderOptions
        }
      }
    })

    const webpackConfig = builder.bundleBuilder.getWebpackConfig('Client')

    const tsLoader = (webpackConfig.module!.rules.find(r => (r.test as RegExp).test('file.ts'))!.use as RuleSetLoader[]).find(u => u.loader === 'ts-loader')

    expect(tsLoader).toBeDefined()
    expect((tsLoader!.options as TsLoaderOptions).transpileOnly).toBe(false)

    const tsxLoader = (webpackConfig.module!.rules.find(r => (r.test as RegExp).test('file.tsx'))!.use as RuleSetLoader[]).find(u => u.loader === 'ts-loader')

    expect(tsxLoader).toBeDefined()
    expect((tsxLoader!.options as TsLoaderOptions).transpileOnly).toBe(false)
  })

  afterEach(async () => {
    await builder.nuxt.close()
  })
})
