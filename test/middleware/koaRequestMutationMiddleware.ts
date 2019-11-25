import { Middleware, Context } from 'koa'

declare module 'koa' {
  export interface BaseContext {
    logger: Record<string, any>
  }
}

export function koaMiddleware(): Middleware {
  return (ctx: Context, next: Function): void => {
    ctx.logger = {
      info: (): void => {},
      error: (): void => {}
    }
    next()
  }
}
