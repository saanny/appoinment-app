import { IAppoinmentRetriver } from '@Services/IAppoinmentRetriver'
import { NextFunction, Request, Response } from 'express'

export class AppoinmentRetriverController {
  constructor(private appoinmentRetriver: IAppoinmentRetriver) {}

  retriveAppointments = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { start, end } = request.query

      const appoinments = await this.appoinmentRetriver.retriveAppoinments(
        start?.toString(),
        end?.toString()
      )
      response.status(200).json({
        appoinments,
      })
    } catch (error) {
      next(error)
    }
  }
}
