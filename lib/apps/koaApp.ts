import Koa, { Middleware } from 'koa'
import Router from 'koa-router'
import Application from 'koa'
import { EndpointDefinition } from './apps'

export const DEFAULT_ENDPOINT = '/dummy'

export function newKoaApp(
  middleware: Middleware[],
  endpointHandler: Middleware,
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
