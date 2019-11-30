import http from 'http'

const handler = (_req: http.IncomingMessage, res: http.ServerResponse) => {
  res.end()
}

export default handler
