import { Appoinment } from '@Domain/models/Appointment'

export interface AppoinmentRepository {
  store(appoinment: Appoinment): Promise<void>
}
