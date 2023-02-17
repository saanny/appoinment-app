import { Appoinment } from '@Domain/models/Appointment'

export interface IAppoinmentStorer {
  storeAppoinment(appoinment: Appoinment): Promise<Appoinment>
}
