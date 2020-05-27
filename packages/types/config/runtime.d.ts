/**
 * NuxtConfigurationRuntimeConfig
 * Documentation : TBD
 * NuxtRuntimeConfig interface can be extended by users to enable intellisense on $config
 */

export interface NuxtRuntimeConfig {
  [key: string]: any
}

export type NuxtConfigurationRuntimeConfig = NuxtRuntimeConfig | ((env: Record<string, string>) => NuxtRuntimeConfig)
