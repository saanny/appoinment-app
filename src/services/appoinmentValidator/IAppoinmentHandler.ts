import { IAppoinment } from '@Domain/models/Appointment'

interface AppoinmentHandler {
  setNext(handler: AppoinmentHandler): AppoinmentHandler

  process(coupon: IAppoinment): IAppoinment | null
}
export default AppoinmentHandler
