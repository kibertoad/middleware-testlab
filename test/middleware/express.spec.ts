import { newApp, DEFAULT_ENDPOINT } from '../../lib/apps/expressApp'
import { expressMiddleware } from './expressRequestMutationMiddleware'
import request from 'supertest'
import { Request, Response } from 'express'

describe('mutation middleware', () => {
  describe('express', () => {
    it('happy path', async () => {
      const app = newApp([expressMiddleware()], (req: Request, res: Response, next: Function) => {
        // @ts-ignore
        expect(req.logger).toMatchSnapshot()
        res.status(201).send()
        next()
      })

      const response = await request(app).get(DEFAULT_ENDPOINT)

      expect(response.status).toEqual(201)
    })
  })
})
