/**
 * NuxtConfigurationServerMiddleware
 * Documentation: https://nuxtjs.org/api/configuration-servermiddleware
 */

import { RequestHandler } from 'express'

export type ServerMiddleware = RequestHandler

export type NuxtConfigurationServerMiddleware = string | { path: string, prefix?: boolean, handler: string | ServerMiddleware } | ServerMiddleware
