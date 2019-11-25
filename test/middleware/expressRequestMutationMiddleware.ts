import { RequestHandlerParams } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'

declare module 'express-serve-static-core' {
  export interface Request {
    logger: Record<string, any>
  }
}

export function expressMiddleware(): RequestHandlerParams {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.logger = {
      info: (): void => {},
      error: (): void => {}
    }
    next()
  }
}
