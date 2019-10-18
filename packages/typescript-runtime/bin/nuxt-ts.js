#!/usr/bin/env node

const cli = (() => { try { return require('@nuxt/cli') } catch (err) { return require('@nuxt/cli-edge') } })()

const { hooks } = require('..')

cli.run(null, hooks)
  .catch((error) => {
    require('consola').fatal(error)
    require('exit')(2)
  })
