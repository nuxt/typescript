import { Configuration } from '@nuxt/types'
import logger from './serverMiddlewares/logger'

const config: Configuration = {
  buildModules: [
    '@nuxt/typescript-build'
  ],
  serverMiddleware: [
    logger
  ],
  telemetry: false
}

export default config
