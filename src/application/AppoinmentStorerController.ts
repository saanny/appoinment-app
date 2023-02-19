import { Appoinment } from '@Domain/models/Appointment'
import AppoinmentValidator from '@Services/appoinmentValidator/AppoinmentValidator'
import { IAppoinmentStorer } from '@Services/IAppoinmentStorer'
import { NextFunction, Request, Response } from 'express'

export class AppoinmentStorerController {
  constructor(private appoinmentStorer: IAppoinmentStorer) {}

  createAppoinment = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      new AppoinmentValidator().handle(request.body)

      const appoinment = new Appoinment(
        request.body.id,
        new Date(request.body.start),
        new Date(request.body.end),
        new Date(request.body.createdAt),
        new Date(request.body.updatedAt)
      )
      await this.appoinmentStorer.storeAppoinment(appoinment)

      response.status(201).json({
        appoinment,
      })
    } catch (error) {
      next(error)
    }
  }
}
