import { Application } from 'express'
import express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'

export const DEFAULT_ENDPOINT = '/dummy'

export function newApp(
  middleware: RequestHandlerParams[],
  endpointHandler: RequestHandlerParams,
  endpoint: string = DEFAULT_ENDPOINT
): Application {
  const app = express()
  middleware.forEach((middlewareEntry: RequestHandlerParams) => {
    app.use(middlewareEntry)
  })

  app.get(endpoint, endpointHandler)
  return app
}
