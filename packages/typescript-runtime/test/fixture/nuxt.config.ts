import { Configuration } from '@nuxt/types'
import pkg from './package.json'

const config: Configuration = {
  mode: 'universal',
  head: {
    title: pkg.name
  },
  modules: ['~/local-module.ts', ['@nuxt/typescript-build', {}]],
  serverMiddleware: [
    { handler: '@/server-middleware.ts', path: '/test' },
    { handler: () => {}, path: '/other' }
  ]
}

export default config
