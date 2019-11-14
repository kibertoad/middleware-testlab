import express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'

declare global {
  namespace Express {
    interface Request {
      requestId: string
    }
  }
}

export function middleware(): RequestHandlerParams {
  return (req: express.Request, _res: express.Response, next: express.NextFunction): void => {
    req.requestId = 'abc'
    next()
  }
}
