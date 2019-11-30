import { Configuration } from '@nuxt/types'
import pkg from './package.json'
// import { getters } from './store/index'

const config: Configuration = {
  mode: 'universal',
  head: {
    title: pkg.name
  },
  modules: [
    '~/local-module.ts',
    ['~/local-module.ts', {}],
    ['@nuxt/typescript-build', {}]
  ],
  serverMiddleware: [
    '@/server-middleware.ts',
    { handler: '@/server-middleware.ts', path: '/test' }
  ]
}

export default config
