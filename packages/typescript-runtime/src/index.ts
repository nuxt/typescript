import { resolve } from 'path'
import { register } from 'ts-node'
import { Hooks } from '@nuxt/types/cli'

const hooks: Hooks = {
  'run:before' ({ argv, rootDir }) {
    const customPath = argv.find((_arg, index) => index > 0 && argv[index - 1] === '--tsconfig')
    const tsConfigPath = resolve(customPath || rootDir, customPath && customPath.endsWith('.json') ? '' : 'tsconfig.json')

    register({
      project: tsConfigPath,
      compilerOptions: {
        module: 'commonjs'
      },
      transpileOnly: true
    })
  },

  config (config) {
    config.extensions = [...(config.extensions || []), 'ts']
  }
}

export {
  hooks
}
