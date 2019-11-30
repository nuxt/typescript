import path from 'path'
import { existsSync, readJson, mkdirp } from 'fs-extra'
import replaceInFile from 'replace-in-file'
import execa from 'execa'
import { Configuration as NuxtConfiguration } from '@nuxt/types'

const esm = require('esm')

interface JsonOptions {
  [key: string]: number | boolean | string | Array<number | boolean | string>
}

interface CompileTypescriptOptions {
  rootDir: string
  tscOptions?: JsonOptions
  tsConfigName?: string
}

function exec (cmd: string, args: string[]) {
  args = args.filter(Boolean)

  return execa(cmd, args, {
    stdout: process.stdout,
    stderr: process.stderr
  })
}

function getNuxtConfig (
  rootDir: string,
  nuxtConfigName: string
): NuxtConfiguration {
  const _esm = esm(module)
  const nuxtConfigFile = _esm(path.resolve(rootDir, nuxtConfigName))
  return nuxtConfigFile.default || nuxtConfigFile
}

function getNuxtConfigName (rootDir: string): string {
  for (const filename of ['nuxt.config.ts', 'nuxt.config.js']) {
    if (existsSync(path.resolve(rootDir, filename))) {
      return filename
    }
  }
  throw new Error(`Cannot read nuxt.config from ${rootDir}`)
}

async function getTypescriptCompilerOptions (
  rootDir: string,
  options: JsonOptions = {},
  tsConfigName: string = 'tsconfig.json'
): Promise<string[]> {
  let compilerOptions: string[] = []

  options = await readAndMergeOptions(path.join(rootDir, tsConfigName), options)

  compilerOptions = Object.keys(options).reduce((compilerOptions, option) => {
    if (compilerOptions && !['rootDirs', 'paths'].includes(option)) {
      compilerOptions.push(`--${option}`, String(options[option]))
    }
    return compilerOptions
  }, [] as string[])

  return [
    ...compilerOptions,
    '--noEmit',
    'false',
    '--rootDir',
    rootDir,
    '--outDir',
    path.join(rootDir, '.nuxt.config'),
    '--allowJs',
    'true'
  ]
}

async function readAndMergeOptions (
  filename: string,
  options: JsonOptions
): Promise<JsonOptions> {
  let newOptions: JsonOptions = options
  if (existsSync(filename)) {
    let tsConfig: { compilerOptions?: JsonOptions }
    try {
      tsConfig = await readJson(filename)
    } catch (e) {
      throw new Error(`Cannot read ${filename}.`)
    }
    newOptions = { ...tsConfig.compilerOptions, ...options }
  }
  return newOptions
}

export async function compileTypescriptBuildFiles ({
  rootDir,
  tsConfigName,
  tscOptions
}: CompileTypescriptOptions): Promise<void> {
  const compileDir = '.nuxt.config'
  const nuxtConfigName = getNuxtConfigName(rootDir)
  const compilerOptions = await getTypescriptCompilerOptions(
    rootDir,
    tscOptions,
    tsConfigName
  )

  // Compile nuxt.config
  await mkdirp(compileDir)
  await exec('tsc', [...compilerOptions, path.join(rootDir, nuxtConfigName)])

  // Compile local modules and serverMiddleware
  const nuxtConfigFile = getNuxtConfig(
    path.join(rootDir, compileDir),
    'nuxt.config.js'
  )
  const srcDir = nuxtConfigFile.srcDir
    ? path.relative(rootDir, nuxtConfigFile.srcDir)
    : '.'
  const { serverMiddleware, modules } = nuxtConfigFile

  const filesToCompile = [
    ...(serverMiddleware || []),
    ...(modules || [])
  ].reduce((filesToCompile, item) => {
    let itemPath = ''

    if (typeof item === 'string') {
      itemPath = item
    } else if (typeof item === 'object' && Array.isArray(item)) {
      itemPath = item[0]
    } else if (typeof item === 'object' && typeof item.handler === 'string') {
      itemPath = item.handler
    }

    if (itemPath) {
      const resolvedPath = path.resolve(
        rootDir,
        itemPath.replace(/^[@~.]\//, `${srcDir}/`).replace(/\.ts$/, '')
      )
      if (existsSync(`${resolvedPath}.ts`)) {
        filesToCompile.push(resolvedPath)
        replaceInFile.sync({
          files: path.resolve(rootDir, `${compileDir}/nuxt.config.js`),
          from: new RegExp(`(?<=['"\`])${itemPath}(?=['"\`])`, 'g'),
          to: itemPath.replace(/\.ts$/, '')
        })
      }
    }
    return filesToCompile
  }, [] as string[])

  await Promise.all(
    filesToCompile.map(file => exec('tsc', [...compilerOptions, file]))
  )
}
