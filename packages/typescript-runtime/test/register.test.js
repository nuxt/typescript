import { register } from 'ts-node'
import { registerTSNode } from '..'

jest.mock('ts-node')

test('registerTSNode', () => {
  const tsConfigPath = 'path/tsconfig.json'

  registerTSNode(tsConfigPath)

  expect(register).toHaveBeenCalledWith({
    project: tsConfigPath,
    compilerOptions: {
      module: 'commonjs'
    }
  })
})
