import type { NuxtConfig } from '@nuxt/types'
import logger from './serverMiddlewares/logger'

const config: NuxtConfig = {
  buildModules: [
    '@nuxt/typescript-build'
  ],
  serverMiddleware: [
    logger
  ],
  telemetry: false
}

export default config
