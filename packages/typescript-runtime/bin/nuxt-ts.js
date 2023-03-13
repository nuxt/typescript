#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

let cli, hooks, version

try {
  cli = require('@nuxt/cli')
  version = require('@nuxt/cli/package.json').version
} catch (err) {
  cli = require('@nuxt/cli-edge')
  version = require('@nuxt/cli-edge/package.json').version
}

const { coerce, gte } = require('semver')

if (gte(coerce(version), '2.15.0')) {
  const chalk = require('chalk')
  const consola = require('consola')
  consola.warn(chalk`You're using Nuxt {green ${version}}, which includes built-in TypeScript {blue runtime} support`)
  consola.warn(chalk`You can safely use {green nuxt} instead of {yellow nuxt-ts} and remove {blue @nuxt/typescript-runtime} package`)
  hooks = {}
} else {
  hooks = require('..').hooks
}

cli.run(null, hooks)
  .catch((error) => {
    require('consola').fatal(error)
    require('exit')(2)
  })
