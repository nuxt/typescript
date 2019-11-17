import { Configuration } from '../config'

type Command = {
  name: 'build' | 'dev' | 'generate' // TBD
  description: string
  usage: string
  options: {
    [key: string]: any // TBD
  }
  [key: string]: any // TBD
}

export interface Hooks {
  config?(config: Configuration): void
  'run:before'?(params: { argv: string [], cmd: Command, rootDir: string }): void
}
