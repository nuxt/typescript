import { ServerMiddleware } from '@nuxt/types'

const serverMiddleware: ServerMiddleware = (_req, _res, next) => {
  console.log('test')
  next()
}

export default serverMiddleware
