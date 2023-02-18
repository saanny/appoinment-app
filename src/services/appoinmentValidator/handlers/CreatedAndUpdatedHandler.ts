import { IAppoinment } from '@Domain/models/Appointment'
import { RequestValidationError } from '@Infra/http/RequestValidationError'
import AbstractAppoinmentHandler from '../AbstractAppoinmentHandler'

class CreatedAndUpdatedHandler extends AbstractAppoinmentHandler {
  public process(appoinment: IAppoinment): IAppoinment | null {
    if (!appoinment.createdAt || !appoinment.updatedAt)
      throw new RequestValidationError('CreatedAt or updatedAt is not provided')
    if (
      isNaN(Date.parse(appoinment.createdAt)) ||
      isNaN(Date.parse(appoinment.updatedAt))
    )
      throw new RequestValidationError(
        'Please provide valid format for createdAt or updatedAt date fields'
      )
    return super.process(appoinment)
  }
}
export default CreatedAndUpdatedHandler
