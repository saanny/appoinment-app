import { IAppoinment } from '@Domain/models/Appointment'
import CreatedAndUpdatedHandler from './handlers/CreatedAndUpdatedHandler'
import IdHandler from './handlers/IdHandler'
import StartAndEndHandler from './handlers/StartAndEndHandler'

class AppoinmentValidator {
  public handle(appoinment: IAppoinment) {
    const idHandler = new IdHandler()
    const startEndHandler = new StartAndEndHandler()
    const createdAndUpdatedHandler = new CreatedAndUpdatedHandler()

    idHandler.setNext(startEndHandler).setNext(createdAndUpdatedHandler)

    return idHandler.process(appoinment)
  }
}
export default AppoinmentValidator
