const path = require('path')

// TODO: Import non-booleans from @nuxt/config
const optionsWithValue = [
  '--config-file', '-c',
  '--modern', '-m',
  '--port', '-p',
  '--hostname', '-H',
  '--unix-socket', '-n'
]

function getRootdirFromArgv() {
  const args = process.argv.slice(2)

  let rootDir = '.'
  for (let i = 0; i < args.length; i++) {
    if (args[i][0] === '-') {
      if (optionsWithValue.includes(args[i])) {
        i++
      }
      continue
    }
    rootDir = args[i]
  }

  return path.resolve(process.cwd(), rootDir)
}

module.exports = {
  getRootdirFromArgv
}
