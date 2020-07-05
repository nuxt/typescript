import path from 'path'
import { register } from 'ts-node'
import { NuxtConfig } from '@nuxt/types'
import { hooks } from '../src'

jest.mock('ts-node')

describe('run:before hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('registers ts-node', () => {
    hooks['run:before']!({ argv: [], command: null, rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('path', 'tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      },
      transpileOnly: true
    })
  })

  test('registers ts-node (custom tsconfig.json path)', () => {
    hooks['run:before']!({ argv: ['--tsconfig', 'custom/tsconfig.json'], command: null, rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('custom/tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      },
      transpileOnly: true
    })
  })

  test('registers ts-node (custom tsconfig.json dir path)', () => {
    hooks['run:before']!({ argv: ['--tsconfig', 'custom'], command: null, rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('custom/tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      },
      transpileOnly: true
    })
  })
})

describe('config hook', () => {
  test('adds ts extension (config.extensions is: defined)', () => {
    const config = { extensions: [] }

    hooks.config!(config)

    expect(config.extensions).toContain('ts')
  })

  test('adds ts extension (config.extensions is: undefined)', () => {
    const config: NuxtConfig = {}

    hooks.config!(config)

    expect(config.extensions).toContain('ts')
  })
})
