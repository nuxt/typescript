import { IncomingMessage, ServerResponse } from 'http'
import Vue, { ComponentOptions } from 'vue'
import VueRouter, { Location, Route } from 'vue-router'
import { Store } from 'vuex'

// augment typings of Vue.js
import './vue'

// augment typings of Vuex
import './vuex'

type NuxtState = Record<string, any>

export interface Context {
  app: NuxtAppOptions
  base: string
  /**
   * @deprecated Use process.client instead
  */
  isClient: boolean
  /**
   * @deprecated Use process.server instead
  */
  isServer: boolean
  /**
   * @deprecated Use process.static instead
  */
  isStatic: boolean
  isDev: boolean
  isHMR: boolean
  route: Route
  from: Route
  store: Store<any>
  env: Record<string, any>
  params: Route['params']
  payload: any
  query: Route['query']
  req: IncomingMessage
  res: ServerResponse
  redirect(status: number, path: string, query?: Route['query']): void
  redirect(path: string, query?: Route['query']): void
  redirect(location: Location): void
  error(params: NuxtError): void
  nuxtState: NuxtState
  beforeNuxtRender(fn: (params: { Components: VueRouter['getMatchedComponents'], nuxtState: NuxtState }) => void): void
}

export type Middleware = string | ((ctx: Context, cb: Function) => Promise<void> | void)
export type Plugin = (ctx: Context, inject: (key: string, value: any) => void) => Promise<void> | void

export interface Transition {
  name?: string
  mode?: string
  css?: boolean
  duration?: number
  type?: string
  enterClass?: string
  enterToClass?: string
  enterActiveClass?: string
  leaveClass?: string
  leaveToClass?: string
  leaveActiveClass?: string
  beforeEnter?(el: HTMLElement): void
  enter?(el: HTMLElement, done: Function): void
  afterEnter?(el: HTMLElement): void
  enterCancelled?(el: HTMLElement): void
  beforeLeave?(el: HTMLElement): void
  leave?(el: HTMLElement, done: Function): void
  afterLeave?(el: HTMLElement): void
  leaveCancelled?(el: HTMLElement): void
}

export interface NuxtError {
  message?: string
  path?: string
  statusCode?: number
}

export interface NuxtLoading extends Vue {
  fail?(): NuxtLoading
  finish(): NuxtLoading
  increase?(num: number): NuxtLoading
  pause?(): NuxtLoading
  start(): NuxtLoading
}

export interface NuxtAppOptions extends ComponentOptions<Vue> {
  [key: string]: any // TBD
}

export interface NuxtApp extends Vue {
  $options: NuxtAppOptions
  $loading: NuxtLoading
  context: Context
  error(params: NuxtError): void
  isOffline: boolean
  isOnline: boolean
  layout: any // TBD
  layoutName: string
  loadLayout(layout: string): Promise<any> // TBD
  refresh(): void
  setLayout(layout: string): any // TBD
}

// window.$nuxt
declare global {
  interface Window {
    $nuxt: NuxtApp
  }
}
