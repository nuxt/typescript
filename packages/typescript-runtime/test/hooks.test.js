import path from 'path'
import { register } from 'ts-node'
import { hooks } from '..'

jest.mock('ts-node')

describe('setup hook', () => {
  beforeEach(() => {
    register.mockClear()
  })

  test('registers ts-node (rootDir: given by CLI)', () => {
    hooks.setup({ rootDir: 'path' })

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('path', 'tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      }
    })
  })

  test('registers ts-node (rootDir: process.argv)', () => {
    process.argv = ['foo', 'bar', 'path']
    hooks.setup({})

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('path', 'tsconfig.json'),
      compilerOptions: {
        module: 'commonjs'
      }
    })
  })
  test("registers ts-node (rootDir: '.')", () => {
    process.argv = ['foo', 'bar']
    hooks.setup({})

    expect(register).toHaveBeenCalledWith({
      project: path.resolve('tsconfig.json'),
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
