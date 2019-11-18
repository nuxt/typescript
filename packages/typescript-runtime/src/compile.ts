import path from 'path'
import { moveSync, existsSync, readJson, mkdirp } from 'fs-extra'
import replaceInFile from 'replace-in-file'
import execa from 'execa'
import { Configuration as NuxtConfiguration } from '@nuxt/types'

const esm = require('esm')

export interface JsonOptions {
  [key: string]: number | boolean | string | Array<number | boolean | string>
}

export interface CompileOptions {
  rootDir: string
}

interface CompileTypescriptOptions {
  rootDir: string
  tscOptions?: JsonOptions
}

export function exec (cmd: string, args: string[]) {
  args = args.filter(Boolean)

  return execa(cmd, args, {
    stdout: process.stdout,
    stderr: process.stderr,
    preferLocal: false,
    env: {
      MINIMAL: '1',
      NODE_OPTIONS: '--max_old_space_size=3000'
    }
  })
}

export function getNuxtConfig (
  rootDir: string,
  nuxtConfigName: string
): NuxtConfiguration {
  const _esm = esm(module)
  const nuxtConfigFile = _esm(path.resolve(rootDir, nuxtConfigName))
  return nuxtConfigFile.default || nuxtConfigFile
}

export function getNuxtConfigName (rootDir: string): string {
  for (const filename of ['nuxt.config.ts', 'nuxt.config.js']) {
    if (existsSync(path.resolve(rootDir, filename))) {
      return filename
    }
  }
  throw new Error(`Cannot read nuxt.config from ${rootDir}`)
}

async function getTypescriptCompilerOptions (
  rootDir: string,
  options: JsonOptions = {}
): Promise<string[]> {
  let compilerOptions: string[] = []

  options = await readAndMergeOptions('tsconfig.json', rootDir, options)

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
  tscOptions
}: CompileTypescriptOptions): Promise<void> {
  const nuxtConfigName = getNuxtConfigName(rootDir)
  const compilerOptions = await getTypescriptCompilerOptions(
    rootDir,
    tscOptions
  )
  await mkdirp('.nuxt.config')
  await exec('tsc', [...compilerOptions, nuxtConfigName])
  await moveSync('.nuxt.config/nuxt.config.js', 'nuxt.config.js', {
    overwrite: true
  })
  const nuxtConfigFile = getNuxtConfig(rootDir, 'nuxt.config.js')
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
        ? path
          .relative(rootDir, nuxtConfigFile.srcDir)
          .replace('.nuxt.config', '.')
        : '.'
      const resolvedPath = path.resolve(
        rootDir,
        itemPath.replace(/^[@~.]\//, `${srcDir}/`).replace(/\.ts$/, '')
      )
      if (existsSync(`${resolvedPath}.ts`)) {
        filesToCompile.push(resolvedPath)
        replaceInFile.sync({
          files: path.resolve(rootDir, 'nuxt.config.js'),
          from: new RegExp(`(?<=['"\`])${itemPath}(?=['"\`])`, 'g'),
          to: itemPath
            .replace(/\.ts$/, '')
            .replace(/^[@~.]\//, '~/.nuxt.config/')
        })
      }
    }
    return filesToCompile
  }, [] as string[])
  await Promise.all(
    filesToCompile.map(file => exec('tsc', [...compilerOptions, file]))
  )
}
