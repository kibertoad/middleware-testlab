import Koa, { BaseContext, Middleware } from 'koa'
import Router from 'koa-router'
import Application from 'koa'
import { EndpointDefinition } from './apps'

export const DEFAULT_ENDPOINT = '/'
const DEFAULT_HANDLER = (ctx: BaseContext, next: Function) => {
  ctx.status = 204
  next()
}

/**
 *
 * @param {RequestHandlerParams[]} middleware
 * @param {RequestHandlerParams} [endpointHandler] - if handler is not specified, by default sends 204 NO CONTENT
 * @param {string | EndpointDefinition} [endpoint='/'] - if endpoint is passed as string, or not specified, by default GET method is used.
 */
export function newKoaApp(
  middleware: Middleware[],
  endpointHandler: Middleware = DEFAULT_HANDLER,
  endpoint: string | EndpointDefinition = DEFAULT_ENDPOINT
): Application {
  const app = new Koa()
  const router = new Router()

  middleware.forEach((middlewareEntry: Middleware) => {
    app.use(middlewareEntry)
  })

  // Resolve endpoint from params
  let method: string
  let path: string
  if (typeof endpoint === 'string') {
    method = 'get'
    path = endpoint
  } else {
    method = endpoint.method
    path = endpoint.path
  }

  // @ts-ignore
  router[method](path, endpointHandler)
  app.use(router.routes()).use(router.allowedMethods())

  return app
}
