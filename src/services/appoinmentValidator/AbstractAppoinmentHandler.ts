import { IAppoinment } from '@Domain/models/Appointment'
import AppoinmentHandler from './IAppoinmentHandler'

abstract class AbstractAppoinmentHandler implements AppoinmentHandler {
  private nextHandler: AppoinmentHandler

  public setNext(handler: AppoinmentHandler): AppoinmentHandler {
    this.nextHandler = handler

    return handler
  }

  public process(appoinment: IAppoinment): IAppoinment | null {
    if (this.nextHandler) {
      return this.nextHandler.process(appoinment)
    }

    return null
  }
}
export default AbstractAppoinmentHandler
