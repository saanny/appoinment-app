import { Appoinment } from '@Domain/models/Appointment'

export interface AppoinmentStorer {
  storeAppoinment(appoinment: Appoinment): Promise<Appoinment>
}
