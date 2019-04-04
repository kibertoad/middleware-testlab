import { Application, Request, Response } from 'express'
import express, { Router } from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import { EndpointDefinition } from './apps'

export const DEFAULT_ENDPOINT = '/'
const DEFAULT_HANDLER = (_req: Request, res: Response, next: Function) => {
  try {
    res.status(201).send
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
export function newExpressApp(
  middleware: RequestHandlerParams[],
  endpointHandler: RequestHandlerParams = DEFAULT_HANDLER,
  endpoint: string | EndpointDefinition = DEFAULT_ENDPOINT
): Application {
  const app = express()
  middleware.forEach((middlewareEntry: RequestHandlerParams) => {
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

  const router = Router()
  // @ts-ignore
  router[method](path, endpointHandler)
  app.use(router)
  return app
}
