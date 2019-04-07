import { Request, Response } from 'express'

export const okHandler = (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK'
  })
}

export const errorHandler = (_req: Request, _res: Response, next: Function) => {
  const error: any = new Error('Something broke down')
  error.details = {
    timestamp: '2019-11-6'
  }
  next(error)
}
