import path from 'path'
import { register } from 'ts-node'
import { hooks } from '..'

jest.mock('ts-node')

describe('run:before hook', () => {
  beforeEach(() => {
    register.mockClear()
  })

  test('registers ts-node', () => {
    hooks['run:before']({ argv: [], rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('path', 'tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      }
    })
  })

  test('registers ts-node (custom tsconfig.json path)', () => {
    hooks['run:before']({ argv: ['--tsconfig', 'custom/tsconfig.json'], rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('custom/tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      }
    })
  })

  test('registers ts-node (custom tsconfig.json dir path)', () => {
    hooks['run:before']({ argv: ['--tsconfig', 'custom'], rootDir: 'path' })

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

    hooks.config(config)

    expect(config.extensions).toContain('ts')
  })

  test('adds ts extension (config.extensions is: undefined)', () => {
    const config = {}

    hooks.config(config)

    expect(config.extensions).toContain('ts')
  })
})
