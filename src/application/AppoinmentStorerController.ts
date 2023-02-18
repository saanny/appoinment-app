import { Appoinment } from '@Domain/models/Appointment'
import { RequestValidationError } from '@Infra/http/RequestValidationError'
import { NextFunction, Request, Response } from 'express'
import { IAppoinmentStorer } from 'src/services/IAppoinmentStorer'

export class AppoinmentStorerController {
  constructor(private appoinmentStorer: IAppoinmentStorer) {}

  createAppoinment = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // We can use chain of responsibility pattern here for validation

      if (!request.body.id)
        throw new RequestValidationError('Id is not provided')
      if (!request.body.end || !request.body.start)
        throw new RequestValidationError('Start or end date is not provided')
      if (!request.body.createdAt || !request.body.updatedAt)
        throw new RequestValidationError(
          'CreatedAt or updatedAt is not provided'
        )
      if (
        isNaN(Date.parse(request.body.end)) ||
        isNaN(Date.parse(request.body.start))
      )
        throw new RequestValidationError(
          'Please provide valid format for start or end date fields'
        )
      if (
        isNaN(Date.parse(request.body.createdAt)) ||
        isNaN(Date.parse(request.body.updatedAt))
      )
        throw new RequestValidationError(
          'Please provide valid format for createdAt or updatedAt date fields'
        )
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
