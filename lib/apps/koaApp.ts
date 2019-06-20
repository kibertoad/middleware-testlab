import Koa, { BaseContext, Middleware } from 'koa'
import Router from 'koa-router'
import Application from 'koa'
import { EndpointDefinition, KoaEndpointAssertor } from './apps'

export const DEFAULT_ENDPOINT = '/'
const DEFAULT_HANDLER = (ctx: BaseContext, next: Function) => {
  ctx.status = 204
  next()
}

/**
 *
 * @param {Middleware[]} [appMiddleware=[]]
 * @param {Middleware[]} [routerMiddleware=[]]
 * @param {KoaEndpointAssertor[]} [transformedRequestAssertors=[]]
 * @param {Middleware} [handler] - if handler is not specified, by default sends 204 NO CONTENT
 * @param {string | EndpointDefinition} [endpoint='/'] - if endpoint is passed as string, or not specified, by default GET method is used.
 */
export function newKoaApp({
  appMiddleware = [],
  routerMiddleware = [],
  transformedRequestAssertors = [],
  handler = DEFAULT_HANDLER,
  endpoint = DEFAULT_ENDPOINT
}: {
  appMiddleware?: Middleware[]
  routerMiddleware?: Middleware[]
  transformedRequestAssertors?: KoaEndpointAssertor[]
  handler?: Middleware
  endpoint?: string | EndpointDefinition
}): Application {
  const app = new Koa()
  appMiddleware.forEach((middlewareEntry: Middleware) => {
    app.use(middlewareEntry)
  })

  const router = new Router()

  routerMiddleware.forEach((middlewareEntry: Middleware) => {
    router.use(middlewareEntry)
  })

  transformedRequestAssertors.forEach(assertor => {
    router.use(async (ctx: BaseContext, next: Function) => {
      await assertor(ctx)
      next()
    })
  })

  // Resolve endpoint from params
  let method: string
  let path: string
  if (typeof endpoint === 'string') {
    method = 'get'
    path = endpoint
  } else {
    method = endpoint.method.toLowerCase()
    path = endpoint.path
  }

  // @ts-ignore
  router[method](path, handler)
  app.use(router.routes()).use(router.allowedMethods())

  return app
}
