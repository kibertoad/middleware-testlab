import { DEFAULT_ENDPOINT, newKoaApp } from '../../lib/apps/koaApp'
import { okHandler } from '../../lib/handlers/commonHandlersKoa'
import { KoaServerManagerJest } from '../../lib/utils/KoaServerManagerJest'

describe('commonHandler', () => {
  describe('okHandler', () => {
    const server = new KoaServerManagerJest()
    server.stopAfterEach()

    it('happy path', async () => {
      const app = newKoaApp({
        handler: okHandler
      })
      server.start(app)

      const response = await server.request().get(DEFAULT_ENDPOINT)

      expect(response.body).toEqual({
        status: 'OK'
      })
      expect(response.status).toEqual(200)
    })
  })
})
