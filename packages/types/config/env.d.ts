/**
 * NuxtConfigurationEnv
 * Documentation: https://nuxtjs.org/api/configuration-env
 */

export type NuxtConfigurationEnv = Record<string, any>
export type NuctConfigurationRuntimeConfig = NuxtConfigurationEnv | ((env: NuxtConfigurationEnv) => NuxtConfigurationEnv)
