import { Request, Response } from 'express-serve-static-core'
import { BaseContext } from 'koa'

export interface EndpointDefinition {
  method: 'get' | 'post' | 'delete' | 'put' | 'patch' | 'options' | 'head'
  path: string
}

export interface ExpressEndpointAssertor {
  (request: Request): void
}

export interface ExpressEndpointResponseAssertor {
  (response: Response): void
}

export interface ErrorAssertor {
  (error: any): void
}

export interface KoaEndpointAssertor {
  (ctx: BaseContext): void
}
