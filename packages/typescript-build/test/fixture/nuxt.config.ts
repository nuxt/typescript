import { Configuration } from '@nuxt/types'
import test from './serverMiddlewares/test'

const config: Configuration = {
  buildModules: [
    '@nuxt/typescript-build'
  ],
  serverMiddleware: [
    test
  ]
}

export default config
