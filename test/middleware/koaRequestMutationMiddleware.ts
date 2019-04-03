import { Middleware, Context } from 'koa'

export function koaMiddleware(): Middleware {
  return (ctx: Context, next: Function): void => {
    ctx.logger = {
      info: (): void => {},
      error: (): void => {}
    }
    next()
  }
}
