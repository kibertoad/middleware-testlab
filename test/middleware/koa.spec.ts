import { newApp, DEFAULT_ENDPOINT } from '../../lib/apps/koaApp'
import { koaMiddleware } from './koaRequestMutationMiddleware'
import request from 'supertest'
import { Server } from 'net'
import { BaseContext } from 'koa'

describe('mutation middleware', () => {
  describe('koa', () => {
    let server: Server
    afterEach(() => {
      server.close()
    })

    it('happy path', async () => {
      const app = newApp([koaMiddleware()], (ctx: BaseContext, next: Function) => {
        expect(ctx.logger).toMatchSnapshot()
        ctx.status = 201
        next()
      })
      server = app.listen(8888)

      const response = await request(server).get(DEFAULT_ENDPOINT)

      expect(response.status).toEqual(201)
    })
  })
})
