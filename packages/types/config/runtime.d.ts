/**
 * NuxtConfigurationRuntimeConfig
 * Documentation : TBD
 * NuxtRuntimeConfig interface can be extended by users to enable intellisense on $config
 */

type JSONObject = { [key: string]: JSONValue }
type JSONValue = null | undefined | boolean | string | number | JSONObject | JSONValue[]

export interface NuxtRuntimeConfig extends JSONObject {}

export type NuxtConfigurationRuntimeConfig = NuxtRuntimeConfig | ((env: typeof process.env) => NuxtRuntimeConfig)
