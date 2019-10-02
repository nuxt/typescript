import { ServerMiddleware } from '@nuxt/types'

const logger: ServerMiddleware = (_req, _res, next) => {
  // eslint-disable-next-line
  console.log(new Date(), 'log something !')
  next()
}

export default logger
