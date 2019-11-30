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
  tsConfigPath?: string
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
  const nuxtConfigFile = esm(path.resolve(rootDir, nuxtConfigName))
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
  tsConfigPath: string = 'tsconfig.json'
): Promise<string[]> {
  let compilerOptions: string[] = []

  options = await readAndMergeOptions(tsConfigPath, rootDir, options)

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
    '.nuxt.config'
  ]
}

async function readAndMergeOptions (
  filename: string,
  rootDir: string,
  options: JsonOptions
): Promise<JsonOptions> {
  let newOptions: JsonOptions = options
  if (existsSync(filename)) {
    let tsConfig: { compilerOptions?: JsonOptions }
    try {
      tsConfig = await readJson(filename)
    } catch (e) {
      throw new Error(`Can not read ${filename} from ${rootDir}`)
    }
    newOptions = { ...tsConfig.compilerOptions, ...options }
  }
  return newOptions
}

export async function compileTypescriptBuildFiles ({
  rootDir,
  tsConfigPath,
  tscOptions
}: CompileTypescriptOptions): Promise<void> {
  const compileDir = '.nuxt.config'
  const nuxtConfigName = getNuxtConfigName(rootDir)
  const compilerOptions = await getTypescriptCompilerOptions(
    rootDir,
    tscOptions,
    tsConfigPath
  )
  await mkdirp(compileDir)
  await exec('tsc', [...compilerOptions, nuxtConfigName])
  const nuxtConfigFile = getNuxtConfig(compileDir, 'nuxt.config.js')
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
      const srcDir = nuxtConfigFile.srcDir
        ? path.relative(rootDir, nuxtConfigFile.srcDir).replace(compileDir, '.')
        : '.'
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
