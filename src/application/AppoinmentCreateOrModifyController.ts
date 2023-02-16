import { NextFunction, Request, Response } from 'express'

export class AppoinmentCreateOrModifyController {
  createOrModify = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {
      next(error)
    }
  }
}
