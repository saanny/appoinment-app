import { IAppoinment } from '@Domain/models/Appointment'
import { RequestValidationError } from '@Infra/http/RequestValidationError'
import AbstractAppoinmentHandler from '../AbstractAppoinmentHandler'

class IdHandler extends AbstractAppoinmentHandler {
  public process(appoinment: IAppoinment): IAppoinment | null {
    if (!appoinment.id) throw new RequestValidationError('Id is not provided')
    return super.process(appoinment)
  }
}
export default IdHandler
