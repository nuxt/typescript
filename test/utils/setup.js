import consola from 'consola'
import exit from 'exit'

jest.setTimeout(60000)

consola.mockTypes(() => jest.fn())

function errorTrap(error) {
  process.stderr.write('\n' + error.stack + '\n')
  exit(1)
}

process.on('unhandledRejection', errorTrap)
process.on('uncaughtException', errorTrap)
