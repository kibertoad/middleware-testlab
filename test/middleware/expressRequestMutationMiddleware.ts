import { RequestHandlerParams } from 'express-serve-static-core'
import { Request, Response } from 'express'

export function expressMiddleware(): RequestHandlerParams {
  return (req: Request, _res: Response, next: Function) => {
    // @ts-ignore
    req.logger = {
      info: (): void => {},
      error: (): void => {}
    }
    next()
  }
}
