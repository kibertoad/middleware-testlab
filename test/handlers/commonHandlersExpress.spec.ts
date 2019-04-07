import { DEFAULT_ENDPOINT, newExpressApp } from '../../lib/apps/expressApp'
import { throwingHandler, okHandler } from '../../lib/handlers/commonHandlersExpress'
import request from 'supertest'

describe('commonHandler', () => {
  describe('okHandler', () => {
    it('happy path', async () => {
      const app = newExpressApp({
        handler: okHandler
      })

      const response = await request(app).get(DEFAULT_ENDPOINT)

      expect(response.body).toEqual({
        status: 'OK'
      })
      expect(response.status).toEqual(200)
    })
  })

  describe('throwingHandler', () => {
    it('happy path', async () => {
      const app = newExpressApp({
        handler: throwingHandler
      })

      const response = await request(app).get(DEFAULT_ENDPOINT)

      expect(response.body).toMatchObject({
        message: 'Something broke down',
        name: 'Error',
        details: {
          timestamp: '2019-11-6'
        }
      })
      expect(response.status).toEqual(500)
    })
  })
})
