import { resolve } from 'path'
import { register } from 'ts-node'
import { Hooks } from '@nuxt/types/cli'
import { compileTypescriptBuildFiles } from './compile'

const hooks: Hooks = {
  async 'run:before' ({ argv, rootDir, cmd }) {
    const customPath = argv.find((_arg, index) => index > 0 && argv[index - 1] === '--tsconfig')
    const tsConfigPath = resolve(customPath || rootDir, customPath && customPath.endsWith('.json') ? '' : 'tsconfig.json')

    if (cmd.name === 'build' && argv.includes('--config')) {
      await compileTypescriptBuildFiles({ rootDir, tsConfigName: customPath || 'tsconfig.json' })
    } else {
      register({
        project: tsConfigPath,
        compilerOptions: {
          module: 'commonjs'
        }
      })
    }
  },

  config (config) {
    config.extensions = [...(config.extensions || []), 'ts']
  }
}

export {
  hooks
}
