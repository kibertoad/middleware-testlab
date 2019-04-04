import { BaseContext } from 'koa'

import { newKoaApp, DEFAULT_ENDPOINT } from '../../lib/apps/koaApp'
import { koaMiddleware } from './koaRequestMutationMiddleware'
import { KoaServerManagerJest } from '../../lib/utils/KoaServerManagerJest'

describe('mutation middleware', () => {
  describe('koa', () => {
    const server = new KoaServerManagerJest()
    server.stopAfterEach()

    it('happy path', async () => {
      const app = newKoaApp({
        middleware: [koaMiddleware()],
        handler: (ctx: BaseContext, next: Function) => {
          expect(ctx.logger).toMatchSnapshot()
          ctx.status = 204
          next()
        }
      })
      server.start(app)

      const response = await server.request().get(DEFAULT_ENDPOINT)

      expect(response.status).toEqual(204)
    })
  })
})
