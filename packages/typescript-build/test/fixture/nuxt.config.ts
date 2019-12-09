import { Configuration } from '@nuxt/types'
import logger from './serverMiddlewares/logger'

const config: Configuration = {
  buildModules: [
    '@nuxt/typescript-build'
  ],
  serverMiddleware: [
    logger
  ]
}

export default config
