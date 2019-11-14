import request from 'supertest'
import { newExpressApp, DEFAULT_ENDPOINT } from 'middleware-testlab'
import { Request } from 'express'
import { middleware } from './middleware'

describe('middleware', () => {
  describe('express', () => {
    it('happy path', async () => {
      const assertor = (req: Request): void => {
        expect(req.requestId).toEqual('abc')
      }

      const app = newExpressApp({
        appMiddleware: [middleware()],
        transformedRequestAssertors: [assertor]
      })

      const response = await request(app).get(DEFAULT_ENDPOINT)

      expect(response.status).toEqual(204)
    })
  })
})
