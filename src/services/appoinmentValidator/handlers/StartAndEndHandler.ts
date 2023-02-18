import { IAppoinment } from '@Domain/models/Appointment'
import { RequestValidationError } from '@Infra/http/RequestValidationError'
import AbstractAppoinmentHandler from '../AbstractAppoinmentHandler'

class StartAndEndHandler extends AbstractAppoinmentHandler {
  public process(appoinment: IAppoinment): IAppoinment | null {
    if (!appoinment.end || !appoinment.start)
      throw new RequestValidationError('Start or end date is not provided')
    if (
      isNaN(Date.parse(appoinment.end)) ||
      isNaN(Date.parse(appoinment.start))
    )
      throw new RequestValidationError(
        'Please provide valid format for start or end date fields'
      )
    return super.process(appoinment)
  }
}
export default StartAndEndHandler
