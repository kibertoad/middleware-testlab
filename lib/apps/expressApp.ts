import { Application, NextFunction, Request, Response } from 'express'
import express, { Router } from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import { ExpressEndpointAssertor, EndpointDefinition, ErrorAssertor } from './apps'
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
 * @param {ExpressEndpointAssertor[]} [transformedRequestAssertors=[]]
 * @param {ErrorAssertor[]} [errorAssertors=[]]
 * @param {RequestHandlerParams[]} [routerMiddleware=[]]
 * @param {RequestHandlerParams} [handler] - if handler is not specified, by default sends 204 NO CONTENT
 * @param {string | EndpointDefinition} [endpoint='/'] - if endpoint is passed as string, or not specified, by default GET method is used.
 */
export function newExpressApp({
  appMiddleware = [],
  routeMiddleware = [],
  routerMiddleware = [],
  transformedRequestAssertors = [],
  errorAssertors = [],
  handler = DEFAULT_HANDLER,
  endpoint = DEFAULT_ENDPOINT
}: {
  appMiddleware?: RequestHandlerParams[]
  routeMiddleware?: RequestHandlerParams[]
  routerMiddleware?: RequestHandlerParams[]
  transformedRequestAssertors?: ExpressEndpointAssertor[]
  errorAssertors?: ErrorAssertor[]
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

  const assertorMiddleware = transformedRequestAssertors.map(assertor => {
    return async (req: Request, _res: Response, next: Function) => {
      await assertor(req)
      next()
    }
  })

  // @ts-ignore
  router[method](path, routeMiddleware, assertorMiddleware, handler)
  appMiddleware.forEach(middleware => {
    app.use(middleware)
  })
  if (errorAssertors && errorAssertors.length > 0) {
    app.use((_req: Request, _res: Response, next: NextFunction) => {
      return next(new Error(`Expected error to be thrown, but it wasn't`))
    })
  }

  app.use(router)

  app.use((err: Error, _req: Request, res: Response, _next: Function) => {
    try {
      errorAssertors.forEach(assertor => {
        assertor(err)
      })
    } catch (e) {
      err = e
    }

    if (err) {
      res.status(500).json(serializeError(err))
    }
  })
  return app
}
