import path from 'path'
import { register } from 'ts-node'
import { Configuration as NuxtConfiguration } from '@nuxt/types'
import { hooks } from '../src'

jest.mock('ts-node')

const devCommand = {
  name: 'dev' as const,
  description: '',
  usage: '',
  options: {}
}

describe('run:before hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('registers ts-node', () => {
    hooks['run:before']!({ argv: [], cmd: devCommand, rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('path', 'tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      }
    })
  })

  test('registers ts-node (custom tsconfig.json path)', () => {
    hooks['run:before']!({ argv: ['--tsconfig', 'custom/tsconfig.json'], cmd: devCommand, rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('custom/tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      }
    })
  })

  test('registers ts-node (custom tsconfig.json dir path)', () => {
    hooks['run:before']!({ argv: ['--tsconfig', 'custom'], cmd: devCommand, rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('custom/tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      }
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
    const config: NuxtConfiguration = {}

    hooks.config!(config)

    expect(config.extensions).toContain('ts')
  })
})
