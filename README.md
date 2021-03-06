# middleware-testlab

Test framework for Node.js middleware (Koa and Express)

[![Build Status][travis-badge]][travis]
[![MIT License][license-badge]][license]

[travis-badge]: https://travis-ci.org/kibertoad/middleware-testlab.svg?branch=master
[travis]: https://travis-ci.org/kibertoad/middleware-testlab
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/kibertoad/middleware-testlab/blob/master/LICENSE

## About

This library aims to reduce amount of boilerplate you need to write in order to test middleware.
It is testing framework-agnostic and allows you to use any tool for managing test suites and assertions;
`middleware-testlab` takes care of instantiating and shutting down application, controller and middleware instances.

## Getting Started

Install `middleware-testlab` as an npm module and save it to your package.json file as a development dependency:

```bash
npm install middleware-testlab --save-dev
```

  Once installed it can now be referenced by simply calling ```require('middleware-testlab');```
  If you want to access Typescript version of a library, call ``import { /*desired imports*/} from `middleware-testlab/index-ts`

## Example (Express)

```
import request from 'supertest'
import { newExpressApp, DEFAULT_ENDPOINT } from 'middleware-testlab'
import { Request, Response } from 'express'
import { expressMiddleware } from './expressRequestMutationMiddleware'

describe('mutation middleware', () => {
  describe('express', () => {
    it('happy path', async () => {
      // Arrange: Instantiate app    
      const app = newExpressApp({
        // Arrange: Pass middleware under test
        routeMiddleware: [expressMiddleware()],
        transformedRequestAssertors: [
          (req: Request): void => {
          // Assert: Check middleware execution results inside endpoint handler
          // @ts-ignore
          expect(req.logger).toMatchSnapshot()
          }
        ]
        // This is optional, if no handler is passed, default handler will return 204
        handler: (req: Request, res: Response, next: Function) => {
          res.status(204).send()
          next()
        }
      })      

      // Act: Send request for middleware to process
      const response = await request(app).get(DEFAULT_ENDPOINT)

      // Assert: Check response
      expect(response.status).toEqual(201)
    })
  })
})
```

## Example (Koa)

```
import { BaseContext } from 'koa'

import { newKoaApp, DEFAULT_ENDPOINT, KoaServerManagerJest } from 'middleware-testlab'
import { koaMiddleware } from './koaRequestMutationMiddleware'

describe('mutation middleware', () => {
  describe('koa', () => {
    const server = new KoaServerManagerJest()
    server.stopAfterEach()

    it('happy path', async () => {
      // Arrange: Instantiate app 
      const app = newKoaApp({
        // Arrange: Pass middleware under test
        routerMiddleware: [koaMiddleware()],
        transformedRequestAssertors: [
          (ctx: BaseContext): void => {
          // Assert: Check middleware execution results inside endpoint handler        
          expect(ctx.logger).toMatchSnapshot()
          }
        ]        
        // This is optional, if no handler is passed, default handler will return 204        
        handler: (ctx: BaseContext, next: Function) => {
          ctx.status = 204
          next()
        }
      })      
      server.start(app)

      // Act: Send request for middleware to process
      const response = await server.request().get(DEFAULT_ENDPOINT)

      // Assert: Check response
      expect(response.status).toEqual(201)
    })
  })
})
```

Note that since SuperTest does not support passing instance of a Koa app directly to
its agent, you need to wrap application instance into Node.js server. You can use
`KoaServerManager*` helper classes for that, or invoke `const server = app.listen(port)` yourself.
