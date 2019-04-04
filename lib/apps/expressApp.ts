import { Application, Request, Response } from 'express'
import express, { Router } from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import { EndpointDefinition } from './apps'

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
 * @param {RequestHandlerParams[]} middleware
 * @param {RequestHandlerParams} [endpointHandler] - if handler is not specified, by default sends 204 NO CONTENT
 * @param {string | EndpointDefinition} [endpoint='/'] - if endpoint is passed as string, or not specified, by default GET method is used.
 */
export function newExpressApp({
  middleware,
  handler = DEFAULT_HANDLER,
  endpoint = DEFAULT_ENDPOINT
}: {
  middleware: RequestHandlerParams[]
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
    method = endpoint.method
    path = endpoint.path
  }

  const router = Router()
  // @ts-ignore
  router[method](path, middleware, handler)
  app.use(router)

  app.use((err: Error, _req: Request, res: Response) => {
    res.status(500).json({ details: err.message })
  })
  return app
}
