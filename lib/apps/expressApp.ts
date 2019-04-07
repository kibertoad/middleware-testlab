import { Application, Request, Response } from 'express'
import express, { Router } from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import { EndpointDefinition } from './apps'
import serializeError from 'serialize-error'

export const DEFAULT_ENDPOINT = '/'
const DEFAULT_HANDLER = (_req: Request, res: Response, next: Function) => {
  try {
    res.status(204).send()
  } catch (e) {
    console.error('Error while processing request: ', e)
    next(e)
  }
}

/**
 *
 * @param {RequestHandlerParams[]} [appMiddleware=[]]
 * @param {RequestHandlerParams[]} [routeMiddleware=[]]
 * @param {RequestHandlerParams[]} [routerMiddleware=[]]
 * @param {RequestHandlerParams} [endpointHandler] - if handler is not specified, by default sends 204 NO CONTENT
 * @param {string | EndpointDefinition} [endpoint='/'] - if endpoint is passed as string, or not specified, by default GET method is used.
 */
export function newExpressApp({
  appMiddleware = [],
  routeMiddleware = [],
  routerMiddleware = [],
  handler = DEFAULT_HANDLER,
  endpoint = DEFAULT_ENDPOINT
}: {
  appMiddleware?: RequestHandlerParams[]
  routeMiddleware?: RequestHandlerParams[]
  routerMiddleware?: RequestHandlerParams[]
  handler?: RequestHandlerParams
  endpoint?: string | EndpointDefinition
}): Application {
  const app = express()

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

  const router = Router()
  routerMiddleware.forEach(middleware => {
    router.use(middleware)
  })

  // @ts-ignore
  router[method](path, routeMiddleware, handler)
  appMiddleware.forEach(middleware => {
    app.use(middleware)
  })
  app.use(router)

  app.use((err: Error, _req: Request, res: Response, _next: Function) => {
    if (err) {
      res.status(500).json(serializeError(err))
    }
  })
  return app
}
