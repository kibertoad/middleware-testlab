import { newExpressApp, DEFAULT_ENDPOINT } from '../../lib/apps/expressApp'
import { expressMiddleware } from './expressRequestMutationMiddleware'
import request from 'supertest'
import { Request } from 'express'

describe('mutation routeMiddleware', () => {
  describe('express', () => {
    it('happy path', async () => {
      const app = newExpressApp({
        routeMiddleware: [expressMiddleware()],
        transformedRequestAssertors: [
          (req: Request) => {
            // @ts-ignore
            expect(req.logger).toMatchSnapshot()
          }
        ]
      })

      const response = await request(app).get(DEFAULT_ENDPOINT)
      expect(response.status).toEqual(204)
    })
  })
})
