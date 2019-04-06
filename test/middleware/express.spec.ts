import { newExpressApp, DEFAULT_ENDPOINT } from '../../lib/apps/expressApp'
import { expressMiddleware } from './expressRequestMutationMiddleware'
import request from 'supertest'
import { Request, Response } from 'express'

describe('mutation routeMiddleware', () => {
  describe('express', () => {
    it('happy path', async () => {
      const app = newExpressApp({
        routeMiddleware: [expressMiddleware()],
        handler: (req: Request, res: Response, next: Function) => {
          // @ts-ignore
          expect(req.logger).toMatchSnapshot()
          res.status(204).send()
          next()
        }
      })

      const response = await request(app).get(DEFAULT_ENDPOINT)

      expect(response.status).toEqual(204)
    })
  })
})
