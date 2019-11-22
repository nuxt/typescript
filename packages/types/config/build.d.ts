/**
 * NuxtConfigurationBuild
 * Documentation: https://nuxtjs.org/api/configuration-build
 */

import {
  Configuration as WebpackConfiguration,
  Options as WebpackOptions,
  Plugin as WebpackPlugin
} from 'webpack'
import { TransformOptions, PluginItem } from '@babel/core'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Options as WebpackDevMiddlewareOptions } from 'webpack-dev-middleware'
import { Options as WebpackHotMiddlewareOptions } from 'webpack-hot-middleware'
import { Options as HtmlMinifierOptions } from 'html-minifier'
import { Options as OptimizeCssAssetsWebpackPluginOptions } from 'optimize-css-assets-webpack-plugin'
import { TerserPluginOptions } from 'terser-webpack-plugin'
import { Options as FileLoaderOptions } from 'file-loader'
import { Options as PugOptions } from 'pug'
import { Options as LessOptions } from 'less'
import { Options as SassOptions } from 'node-sass'
import { VueLoaderOptions } from 'vue-loader'

interface FileLoaderOptions {
  fallback?: string
  limit?: number | boolean | string
  mimetype?: string
}

type CssLoaderUrlFunction = (url: string, resourcePath: string) => boolean
type CssLoaderImportFunction = (parsedImport: string, resourcePath: string) => boolean
type CssLoaderMode = 'global' | 'local'
interface CssLoaderModulesOptions {
  mode?: CssLoaderMode
  localIdentName?: string
  context?: string
  hashPrefix?: string
  getLocalIdent?: (context: string, localIdentName: string, localName: string, options: CssLoaderModulesOptions) => string
  localIdentRegExp?: string | RegExp
}

interface CssLoaderOptions {
  url?: boolean | CssLoaderUrlFunction
  import?: boolean | CssLoaderImportFunction
  modules?: boolean | CssLoaderMode | CssLoaderModulesOptions
  sourceMap?: boolean
  importLoaders?: number
  localsConvention?: 'asIs' | 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly'
  onlyLocals?: boolean
}

interface NuxtConfigurationLoaders {
  file?: FileLoaderOptions
  fontUrl?: FileLoaderOptions
  imgUrl?: FileLoaderOptions
  pugPlain?: PugOptions
  vue?: VueLoaderOptions
  css?: CssLoaderOptions
  cssModules?: CssLoaderOptions
  less?: LessOptions
  sass?: SassOptions
  scss?: SassOptions
  stylus?: any // TBD
  vueStyle?: {
    manualInject?: boolean
    ssrId?: boolean
    shadowMode?: boolean
  }
}

interface NuxtBabelPresetEnv {
  isServer: boolean
}

interface NuxtBabelOptions extends Pick<TransformOptions, Exclude<keyof TransformOptions, 'presets'>> {
  cacheCompression?: boolean
  cacheDirectory?: boolean
  cacheIdentifier?: string
  customize?: string | null
  presets?: ((env: NuxtBabelPresetEnv, defaultPreset: [string, object]) => PluginItem[] | void) | PluginItem[] | null
}

interface Warning {
  message: string
  name: string
}

export interface NuxtConfigurationBuild {
  additionalExtensions?: string[]
  analyze?: BundleAnalyzerPlugin.Options | boolean
  babel?: NuxtBabelOptions
  cache?: boolean
  crossorigin?: string
  cssSourceMap?: boolean
  devMiddleware?: WebpackDevMiddlewareOptions
  devtools?: boolean
  extend?(
    config: WebpackConfiguration,
    ctx: {
      isDev: boolean,
      isClient: boolean,
      isServer: boolean,
      loaders: NuxtConfigurationLoaders
    }
  ): void
  extractCSS?: boolean | Record<string, any>
  filenames?: { [key in 'app' | 'chunk' | 'css' | 'img' | 'font' | 'video']?: (ctx: { isDev: boolean, isModern: boolean }) => string }
  friendlyErrors?: boolean
  hardSource?: boolean
  hotMiddleware?: WebpackHotMiddlewareOptions
  html?: { minify: HtmlMinifierOptions }
  indicator?: boolean
  loaders?: NuxtConfigurationLoaders
  optimization?: WebpackOptions.Optimization
  optimizeCSS?: OptimizeCssAssetsWebpackPluginOptions | boolean
  parallel?: boolean
  plugins?: WebpackPlugin[]
  postcss?: any // TBD
  profile?: boolean
  publicPath?: string
  quiet?: boolean
  splitChunks?: {
    commons?: boolean
    layouts?: boolean
    pages?: boolean
  }
  ssr?: boolean
  standalone?: boolean
  templates?: any
  terser?: TerserPluginOptions | boolean
  transpile?: (string | RegExp)[]
  warningIgnoreFilters?: Array<(warn: Warning) => boolean>
  watch?: string[]
}
