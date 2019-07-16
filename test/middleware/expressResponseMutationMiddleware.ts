import { RequestHandlerParams } from 'express-serve-static-core'
import { Request, Response } from 'express'

export function expressNoCacheMiddleware(): RequestHandlerParams {
  return (_req: Request, res: Response, next: Function) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')
    next()
  }
}
