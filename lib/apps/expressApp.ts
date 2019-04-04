import { Application } from 'express'
import express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import { EndpointDefinition } from './apps'

export const DEFAULT_ENDPOINT = '/dummy'

export function newExpressApp(
  middleware: RequestHandlerParams[],
  endpointHandler: RequestHandlerParams,
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

  // @ts-ignore
  app[method](path, endpointHandler)
  return app
}
