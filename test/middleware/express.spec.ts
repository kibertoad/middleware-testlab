import { newExpressApp, DEFAULT_ENDPOINT } from '../../lib/apps/expressApp'
import { expressMiddleware } from './expressRequestMutationMiddleware'
import request from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { expressNoCacheMiddleware } from './expressResponseMutationMiddleware'

describe('mutation routeMiddleware', () => {
  describe('express', () => {
    it('happy path - request', async () => {
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

    it('happy path - response', async () => {
      const app = newExpressApp({
        routeMiddleware: [expressNoCacheMiddleware()],
        transformedResponseAssertors: [
          (res: Response) => {
            expect(res.getHeaders()).toMatchSnapshot()
          }
        ]
      })

      const response = await request(app).get(DEFAULT_ENDPOINT)
      expect(response.status).toEqual(204)
    })

    it('supports error assertors', async () => {
      const app = newExpressApp({
        appMiddleware: [
          (req: Request, res: Response, next: NextFunction) => {
            const error: any = new Error('Something broke down')
            error.details = {
              timestamp: '2019-11-6'
            }
            next(error)
          }
        ],
        errorAssertors: [
          error => {
            // @ts-ignore
            expect(error.details).toMatchSnapshot()
          }
        ]
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
