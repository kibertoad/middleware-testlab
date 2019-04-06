import { Request, Response } from 'express'

export const okHandler = (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK'
  })
}
