const path = require('path')
const { tryResolve } = require('./resolve')

function getCliOptions () {
  const cli = ['@nuxt/cli', '@nuxt/cli-edge'].find(cli => tryResolve(cli))
  return Object.entries(require(cli).options)
    .reduce((options, [_key, value]) => {
      return { ...options, ...value }
    }, {})
}

function getCliOptionsWithValue () {
  return Object.entries(getCliOptions())
    .filter(([_name, { type }]) => type !== 'boolean')
    .reduce((optionsWithValue, [name, { alias }]) => {
      return [...optionsWithValue, `--${name}`, ...alias ? [`-${alias}`] : []]
    }, [])
}

function getRootdirFromArgv () {
  const args = process.argv.slice(2)
  const optionsWithValue = getCliOptionsWithValue()

  const isCliOption = (previousArg, currentArg) => {
    return ['dev', 'build', 'start', 'generate'].includes(currentArg) ||
      currentArg[0] === '-' ||
      (previousArg && previousArg[0] === '-' && optionsWithValue.includes(previousArg))
  }

  const rootDir = args.find((arg, i) => !isCliOption(args[i - 1], arg)) || '.'

  return path.resolve(process.cwd(), rootDir)
}

module.exports = {
  getRootdirFromArgv
}
