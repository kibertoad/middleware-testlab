import Koa, { Middleware } from 'koa'
import Router from 'koa-router'
import Application from 'koa'

export const DEFAULT_ENDPOINT = '/dummy'

export function newApp(
  middleware: Middleware[],
  endpointHandler: Middleware,
  endpoint: string = DEFAULT_ENDPOINT
): Application {
  const app = new Koa()
  const router = new Router()

  middleware.forEach((middlewareEntry: Middleware) => {
    app.use(middlewareEntry)
  })

  router.get(endpoint, endpointHandler)
  app.use(router.routes()).use(router.allowedMethods())

  return app
}
