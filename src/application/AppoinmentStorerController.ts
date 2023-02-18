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
      // most write test for this block of code
      if (!request.body.appoinments)
        throw new RequestValidationError(
          'Appoinments field is required to provide'
        )

      const appoinments: Array<Appoinment> = []

      for (const appoinmentData of request.body.appoinments) {
        // We can use chain of responsibility pattern here for validation

        if (!appoinmentData.id)
          throw new RequestValidationError('Id is not provided')
        if (!appoinmentData.end || !appoinmentData.start)
          throw new RequestValidationError('Start or end date is not provided')
        if (!appoinmentData.createdAt || !appoinmentData.updatedAt)
          throw new RequestValidationError(
            'CreatedAt or updatedAt is not provided'
          )
        if (
          isNaN(Date.parse(appoinmentData.end)) ||
          isNaN(Date.parse(appoinmentData.start))
        )
          throw new RequestValidationError(
            'Please provide valid format for start or end date fields'
          )
        if (
          isNaN(Date.parse(appoinmentData.createdAt)) ||
          isNaN(Date.parse(appoinmentData.updatedAt))
        )
          throw new RequestValidationError(
            'Please provide valid format for createdAt or updatedAt date fields'
          )
        const appoinment = new Appoinment(
          appoinmentData.id,
          new Date(appoinmentData.start),
          new Date(appoinmentData.end),
          new Date(appoinmentData.createdAt),
          new Date(appoinmentData.updatedAt)
        )
        const newAppoinment = await this.appoinmentStorer.storeAppoinment(
          appoinment
        )
        appoinments.push(newAppoinment)
      }

      const appoinmentsValidatedData = [...appoinments]

      response.status(201).json({
        appoinments,
      })
    } catch (error) {
      next(error)
    }
  }
}
