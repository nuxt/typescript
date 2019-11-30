import { Configuration } from '@nuxt/types'
import pkg from './package.json'
// import { getters } from './store/index'

const config: Configuration = {
  mode: 'universal',
  head: {
    title: pkg.name
  },
  buildModules: ['@nuxt/typescript-build'],
  modules: ['~/local-module.ts'],
  serverMiddleware: ['@/server-middleware.ts']
}

export default config
