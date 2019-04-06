import { BaseContext } from 'koa'

export const okHandler = (ctx: BaseContext, next: Function) => {
  ctx.status = 200
  ctx.body = {
    status: 'OK'
  }
  next()
}
