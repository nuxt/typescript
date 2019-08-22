/**
 * NuxtConfigurationModule
 * Documentation: https://nuxtjs.org/api/configuration-modules
 *                https://nuxtjs.org/guide/modules
 */

import { Configuration } from '.'

interface ModuleThis {
  options: Configuration
  nuxt: any // TBD
  [key: string]: any // TBD
}

export type Module<T = Record<string, any>> = (this: ModuleThis, moduleOptions?: T) => Promise<void> | void

export type NuxtConfigurationModule = string | [string, Record<string, any>] | Module
